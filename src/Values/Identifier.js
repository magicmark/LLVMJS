// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';
import VariableExprAST from "../Nodes/VariableExprAST";

export default (ast: any, props: any): any => {
  assert(ast.type === "Identifier");

  return new VariableExprAST(ast.name);
};
