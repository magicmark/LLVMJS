// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

export default class Program extends ASTNode {
  codegen(props: any) {
    this.ast.body.forEach(node => {
      visit(node);
    });
  }
}
