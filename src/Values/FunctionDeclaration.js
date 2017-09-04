// @flow
import assert from 'assert';
import * as llvm from "llvm-node";
import visit from '../visit';
import PrototypeAST from "../Nodes/PrototypeAST";
import FunctionAST from "../Nodes/FunctionAST";

export default (ast: any, props: any): any => {
  assert(ast.type === "FunctionDeclaration");

  const params = [];
  ast.params.forEach(param => {
    params.push(param.name);
  });

  const fp = new PrototypeAST(ast.id.name, ["n"]);
  const f = new FunctionAST(fp, visit(ast.body, 'BlockStatement'));
  return f.codegen(props);
};
