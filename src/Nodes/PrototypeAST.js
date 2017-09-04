// @flow
import * as llvm from "llvm-node";

import type { ExprAST } from "./ExprAST";

// PrototypeAST - This class represents the "prototype" for a function,
// which captures its name, and its argument names (thus implicitly the number
// of arguments the function takes), as well as if it is an operator.
export default class PrototypeAST implements ExprAST {
  name: string;
  args: string[];
  isOperator: boolean;
  precedence: number;

  constructor(name: string, args: string[], isOperator: boolean = false, precedence: number = 0) {
    this.name = name;
    this.args = args;
    this.isOperator = isOperator;
    this.precedence = precedence;
  }

  codegen(props: any) {
    const ints = new Array(this.args.length).fill(
      llvm.Type.getInt32Ty(props.context)
    );

    const ft = llvm.FunctionType.get(
      llvm.Type.getInt32Ty(props.context),
      ints,
      false
    );

    const f = llvm.Function.create(ft, 0, this.name, props.theModule);

    f.getArguments().forEach((argument, i) => {
      argument.name = this.args[i];
    });

    return f;
  }
}
