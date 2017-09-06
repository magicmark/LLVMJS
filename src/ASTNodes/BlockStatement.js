// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

export default class BlockStatement extends ASTNode {
  codegen(props: any) {
    // loop through all lines in the body except for the last one (return statement)
    for (let node of this.ast.body.filter(n => n.type !== "ReturnStatement")) {
      visit(node);
    }

    // evaluate last node separately and return it (return value)
    const returnNode = this.ast.body[this.ast.body.length - 1];
    if (returnNode.type !== "ReturnStatement") {
      throw "last item is not ReturnStatement - for now, we assume everything returns something";
    }

    this.llvmValue = visit(returnNode, "ReturnStatement").llvmValue;
  }
}
