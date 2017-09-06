// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

// todo: move elsewhere
const CreateEntryBlockAlloca = (props, theFunction, varName) => {
  const tmpB = new llvm.IRBuilder(props.context);
  tmpB.setInsertionPoint(theFunction.getEntryBlock());
  const intType = llvm.Type.getInt32Ty(props.context);
  return tmpB.createAlloca(
    intType,
    llvm.Constant.getNullValue(intType),
    varName
  );
};

export default class FunctionDeclaration extends ASTNode {
  codegen(props: any) {
    // todo: visit ast? they'll be identifiers which won't exist yet...
    const paramNames = this.ast.params.map(param => param.name);
    const functionName = this.ast.id.name;

    // =====================
    // PrototypeAST
    // =====================

    // for now, you can only pass/return ints
    const functionType = llvm.FunctionType.get(
      llvm.Type.getInt32Ty(props.context), // return type
      new Array(paramNames.length).fill(
        // arg types
        llvm.Type.getInt32Ty(props.context)
      ),
      false
    );

    const theFunction = llvm.Function.create(
      functionType,
      0,
      functionName,
      props.theModule
    );

    theFunction.getArguments().forEach((argument, i) => {
      argument.name = paramNames[i];
    });

    // ====================
    // FunctionAST
    // ====================

    const bb = llvm.BasicBlock.create(props.context, "entry", theFunction);
    props.builder.setInsertionPoint(bb);

    theFunction.getArguments().forEach(argument => {
      const alloca = CreateEntryBlockAlloca(props, theFunction, argument.name);
      props.builder.createStore(argument, alloca);
      props.namedValues[argument.name] = alloca;
    });

    const retval = visit(this.ast.body, "BlockStatement").llvmValue;

    if (retval) {
      props.builder.createRet(retval);
      llvm.verifyFunction(theFunction);
      this.llvmValue = theFunction;
    } else {
      throw "function did not return anything";
    }
  }
}
