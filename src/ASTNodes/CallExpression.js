// @flow
import type { ASTNode } from "./ASTNode";

import assert from "assert";
import * as llvm from "llvm-node";
import visit from "../visit";
import CallExprAST from "../Nodes/CallExprAST";

export class CallExpression extends ASTNode {

  codegen(props) {
    const calleFunctionLLVMValue = props.theModule.getFunction(this.ast.callee.name);

    if (!calleFunctionLLVMValue) {
      throw `Unknown function referenced: ${this.callee}`;
    }

    const argsv = this.ast.arguments.map(visit).map(node => node.llvmValue);

    this.llvmValue = props.builder.createCall(calleFunctionLLVMValue, argsv, "calltmp");
  }
}
