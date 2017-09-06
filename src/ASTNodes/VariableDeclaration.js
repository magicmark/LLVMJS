// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

// multiple VariableDeclarator in declerators:
// const a = 1, b = 2;
//
// todo: support this syntax

export default class VariableDeclaration extends ASTNode {
  codegen(props: any) {
    visit(this.ast.declarations[0], ["VariableDeclarator"]);
  }
}
