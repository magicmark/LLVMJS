// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

export default class Literal extends ASTNode {
  codegen(props: any) {
    this.llvmValue = llvm.ConstantInt.get(props.context, this.ast.value);
  }
}
