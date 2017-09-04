// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';
import CallExprAST from "../Nodes/CallExprAST";

export default (ast: any, props: any): any => {
  assert(ast.type === "CallExpression");

  // return {
  //   codegen: (props) => {

      const args = [];
      ast.arguments.forEach(arg => {
        args.push(visit(arg));
      });

      return new CallExprAST(ast.callee.name, args);
  //   }
  // };
};
