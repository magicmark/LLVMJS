// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';

export default (ast: any, props: any): any => {
  assert(ast.type === "BlockStatement");

  // TODO: actual node type for block?
  return {
    codegen: (props) => {

      // loop through all lines in the body except for the last one (return statement)
      for (let c of ast.body.filter(b => b.type !== 'ReturnStatement')) {
        visit(c).codegen(props);
      }

      // evaluate last node separately and return it (return value)
      const returnNode = ast.body[ast.body.length - 1];
      if (returnNode.type !== 'ReturnStatement') {
          throw 'last item is not ReturnStatement - for now, we assume everything returns something';
      }

      return visit(returnNode, "ReturnStatement").codegen(props);
    }
  };

};
