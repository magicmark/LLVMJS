// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';

export default (ast: any, props: any): any => {
  assert(ast.type === "VariableDeclaration");

  // multiple VariableDeclarator in declerators:
  // const a = 1, b = 2;
  //
  // todo: support this syntax

  // return {
  //   codegen: (props) => {
      return visit(ast.declarations[0], "VariableDeclarator");
  //   }
  // };

};
