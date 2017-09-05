// @flow
import type { ASTNode } from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";
import VariableExprAST from "../Nodes/VariableExprAST";

export class Identifier extends ASTNode {
  codegen(props) {
    const val = props.namedValues[this.ast.name];
    if (!val) {
      throw "could not find " + this.ast.name;
    }

    this.llvmValue = props.builder.createLoad(val, this.ast.name);
  }
}
