// @flow
import * as llvm from "llvm-node";
import type { ExprAST } from './ExprAST';
// type i32 = number;

// const builder = (value: i32): string => {
//     return `@foo = global i32 ${value}`;
// }

/**
 * Expression class for numeric literals like "1.0"
 */
export default class NumberExprAST implements ExprAST {
    val: number;

    constructor(val: number) {
      this.val = val;
    }

    codegen({context, theModule}: any) {
      return llvm.ConstantInt.get(context, this.val);
    }
}
