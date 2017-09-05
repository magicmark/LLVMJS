// @flow
import * as llvm from "llvm-node";
import type { ExprAST } from './ExprAST';

export default class VariableExprAST implements ExprAST {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    codegen(props: any) {
      const v = props.namedValues[this.name];
      if (!v) {
        throw 'could not find ' + this.name;
      }

      return props.builder.createLoad(v, this.name);
    }
}
