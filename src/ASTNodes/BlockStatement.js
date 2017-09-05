// @flow
import type { ASTNode } from "./ASTNode";
import assert from "assert";
import * as llvm from "llvm-node";
import visit from "../visit";

export class BlockStatement extends ASTNode {

  codegen(props) {
    // loop through all lines in the body except for the last one (return statement)
    for (let node of this.ast.body.filter(n => n.type !== "ReturnStatement")) {
      visit(node);
    }

    // evaluate last node separately and return it (return value)
    const returnNode = this.ast.body[ast.body.length - 1];
    if (returnNode.type !== "ReturnStatement") {
      throw "last item is not ReturnStatement - for now, we assume everything returns something";
    }

    this.llvmValue = visit(returnNode, "ReturnStatement");
  }
}
