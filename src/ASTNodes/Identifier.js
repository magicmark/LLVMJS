// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

export default class Identifier extends ASTNode {
  codegen(props: any) {
    const val = props.namedValues[this.ast.name];
    if (!val) {
      throw "could not find " + this.ast.name;
    }

    this.llvmValue = props.builder.createLoad(val, this.ast.name);
  }
}
