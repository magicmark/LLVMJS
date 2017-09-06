// @flow
import ASTNode from "./ASTNode";
import * as llvm from "llvm-node";
import visit from "../visit";

// todo: uch, move elsewhere
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

export default class VariableDeclarator extends ASTNode {
  codegen(props: any) {
    const varName = this.ast.id.name;
    const varInitValue = visit(this.ast.init, ["Literal", "CallExpression"])
      .llvmValue;

    if (!varInitValue) {
      throw "could not get value for var";
    }

    const theFunction = props.builder.getInsertBlock().parent;
    const alloca = CreateEntryBlockAlloca(props, theFunction, varName);
    props.builder.createStore(varInitValue, alloca);
    props.namedValues[varName] = alloca;
  }
}
