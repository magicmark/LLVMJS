// @flow
import type { ASTNode } from "./ASTNode";
import * as llvm from "llvm-node";
import visit from '../visit';
import PrototypeAST from "../OldNodes/PrototypeAST";
import FunctionAST from "../OldNodes/FunctionAST";

export class FunctionDeclaration extends ASTNode {
  //
  // constructor(ast: any, props: any, args: any[]) {
  //   super(ast, props);
  //
  //   this.args = args;
  // }
  //
  codegen(props) {
    // todo: move elsewhere
    const CreateEntryBlockAlloca = (theFunction, varName) => {
        const tmpB = new llvm.IRBuilder(props.context);
        tmpB.setInsertionPoint(theFunction.getEntryBlock());
        const intType = llvm.Type.getInt32Ty(props.context);
        return tmpB.createAlloca(intType, llvm.Constant.getNullValue(intType), varName);
    };


    // todo: visit ast? they'll be identifiers which won't exist yet...
    const paramNames = this.ast.params.map(param => param.name);
    const functionName = this.ast.id.name;

    // =====================
    // PrototypeAST
    // =====================

    // for now, you can only pass/return ints
    const functionType = llvm.FunctionType.get(
      llvm.Type.getInt32Ty(props.context), // return type
      new Array(paramNames.length).fill( // arg types
        llvm.Type.getInt32Ty(props.context)
      ),
      false
    );

    const theFunction = llvm.Function.create(functionType, 0, functionName, props.theModule);

    theFunction.getArguments().forEach((argument, i) => {
      argument.name = paramNames[i];
    });

    // ====================
    // FunctionAST
    // ====================

    const bb = llvm.BasicBlock.create(context, "entry", theFunction);
    builder.setInsertionPoint(bb);

    //NamedValues.clear();
    theFunction.getArguments().forEach(argument => {
      const alloca = CreateEntryBlockAlloca(theFunction, argument.name);
      props.builder.createStore(argument, alloca);
      props.namedValues[argument.name] = alloca;
    });

    retval = visit(this.ast.body, 'BlockStatement').llvmValue;

    if (retval) {
      builder.createRet(retval);
      llvm.verifyFunction(theFunction);

      this.llvmValue = theFunction;
    }

    throw 'function did not return anything';
  };
}
