// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';
import VarExprAST from "../Nodes/VarExprAST";

export default (ast: any, props: any): any => {
  assert(ast.type === "VariableDeclarator");

  // return {
  //   codegen: (props) => {
      // TODO: should `ast.id` ever be visit'd to get `name`?
      // it's an Identifier, but it won't have been initialised yet....
      const name = ast.id.name;
      const val = visit(ast.init, ["Literal", "CallExpression"]);

      return new VarExprAST([name, val]);
  //   }
  // };

};
