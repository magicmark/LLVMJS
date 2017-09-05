// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';

export default (ast: any, props: any): any => {
  assert(ast.type === "ReturnStatement");

  // TODO: actual node type for ReturnStatement?
  return {
    codegen: (props) => {
      return visit(ast.argument, ["Literal","Identifier"]).codegen(props);
    }
  };

};
