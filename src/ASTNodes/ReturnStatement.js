// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

export default class ReturnStatement extends ASTNode {
  codegen(props: any) {
    this.llvmValue = visit(this.ast.argument, [
      "Literal",
      "Identifier"
    ]).llvmValue;
  }
}
