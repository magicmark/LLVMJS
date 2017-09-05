// @flow
import * as llvm from "llvm-node";
import type { ExprAST } from "./ExprAST";

export default class CallExprAST implements ExprAST {
  callee: string;
  args: any[];

  constructor(callee: string, args: any[]) {
    this.callee = callee;
    this.args = args;
  }

  codegen(props: any) {
    const calleF = props.theModule.getFunction(this.callee);

    if (!calleF) {
      throw "Unknown function referenced " + this.callee;
    }

    const argsv = [];
    this.args.forEach(arg => {
      argsv.push(arg.codegen(props));
    });

    return props.builder.createCall(calleF, argsv, "calltmp");
  }
}
