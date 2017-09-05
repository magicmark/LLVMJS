// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';
import NumberExprAST from "../Nodes/NumberExprAST";

export default (ast: any, props: any): any => {
  assert(ast.type === "Literal");

  return new NumberExprAST(ast.value);
};
