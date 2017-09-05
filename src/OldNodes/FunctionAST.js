// @flow
import * as llvm from "llvm-node";

import type { ExprAST } from "./ExprAST";
import PrototypeAST from "./PrototypeAST";

/**
 * FunctionAST - This class represents a function definition itself.
 */
export default class FunctionAST implements ExprAST {
  Proto: PrototypeAST;
  body: any;

  constructor(Proto: PrototypeAST, body: ExprAST) {
    this.Proto = Proto;
    this.body = body;
  }

  codegen(props: any) {
    // TODO: move this somewhere else
    const CreateEntryBlockAlloca = (theFunction, varName) => {
        const tmpB = new llvm.IRBuilder(props.context);
        tmpB.setInsertionPoint(theFunction.getEntryBlock());
        const intType = llvm.Type.getInt32Ty(props.context);
        return tmpB.createAlloca(intType, llvm.Constant.getNullValue(intType), varName);
    };

    let retval;

    const { builder, context, theModule } = props;

    const theFunction = this.Proto.codegen(props);
    if (!theFunction) {
      throw 'oops!';
    }

    const bb = llvm.BasicBlock.create(context, "entry", theFunction);
    builder.setInsertionPoint(bb);

    theFunction.getArguments().forEach(argument => {
      const alloca = CreateEntryBlockAlloca(theFunction, argument.name);
      props.builder.createStore(argument, alloca);
      props.namedValues[argument.name] = alloca;
    });

    retval = this.body.codegen(props);

    if (retval) {
      builder.createRet(retval);
      llvm.verifyFunction(theFunction);
      return theFunction;
    }

    return null;
  }

}
