import * as estree from 'estree';
import * as Uuid from '../utils/Uuid';

let patch = (node: estree.Program): void => {
  let id = Uuid.generate('ephox');

  node.body = node.body.reduce((acc, node) => {
    if (node.type === 'ExportDefaultDeclaration') {
      var declaration = node.declaration;
      if (declaration.type === 'ObjectExpression') {
        return acc.concat([
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": id
                },
                "init": declaration
              }
            ],
            "kind": "var"
          },
          {
            "type": "ExportDefaultDeclaration",
            "declaration": {
              "type": "Identifier",
              "name": id
            }
          }
        ]);
      }
    }

    return acc.concat([node]);
  }, []);
};

export {
  patch
}