// @flow
import * as llvm from "llvm-node";
import type { ExprAST } from "./ExprAST";
//
// const CreateEntryBlockAlloca = function(theFunction, varName) {
//   const TmpB = new llvm.IRBuilder(llvm.globalContext);
//   TmpB.setInsertPoint(TheFunction.basicBlocks[0]);
//   return TmpB.createAlloca(doubleTy, 0, VarName);
// };

export default class VarExprAST implements ExprAST {
  // varNames: [
  //   string, ExprAST,
  // ][];

  varDef: [string, ExprAST];

  constructor(varDef: any) {
    this.varDef = varDef;
  }

  codegen(props: any) {
    // TODO: move this somewhere else
    const CreateEntryBlockAlloca = (theFunction, varName) => {
        const tmpB = new llvm.IRBuilder(props.context);
        tmpB.setInsertionPoint(theFunction.getEntryBlock());
        const intType = llvm.Type.getInt32Ty(props.context);
        return tmpB.createAlloca(intType, llvm.Constant.getNullValue(intType), varName);
    };

    // const oldBindings = [];
    const theFunction = props.builder.getInsertBlock().parent;

    // for Each vardef: {
    const [varName, varInit] = this.varDef;

    const initVal = varInit.codegen(props);
    if (!initVal) {
      return null;
    }

    const alloca = CreateEntryBlockAlloca(theFunction, varName);
    props.builder.createStore(initVal, alloca);
    // oldBindings.unshift(props.namedValues[varName]);
    props.namedValues[varName] = alloca;
    //
    // return
    // }

    // const bodyval = this.body.codegen(props);
    // if (!bodyval) {
    //   return null;
    // }

    // for each varnames
    // props.namedValues[this.varDef[0]] = oldBindings[0];
    //
    // return bodyval;
  }

}
