// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

export default class CallExpression extends ASTNode {
  codegen(props: any) {
    const calleFunctionLLVMValue = props.theModule.getFunction(
      this.ast.callee.name
    );

    if (!calleFunctionLLVMValue) {
      throw `Unknown function referenced: ${this.ast.callee.name}`;
    }

    const argsv = this.ast.arguments.map(visit).map(node => node.llvmValue);

    this.llvmValue = props.builder.createCall(
      calleFunctionLLVMValue,
      argsv,
      "calltmp"
    );
  }
}
