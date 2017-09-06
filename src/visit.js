// @flow
import * as llvm from "llvm-node";

import * as ASTNodes from "./ASTNodes";
import { checkIsNodeExpected } from "./util";
import PrototypeAST from "./OldNodes/PrototypeAST";

// TODO: define elsewhere
const context = new llvm.LLVMContext();
const theModule = new llvm.Module("my cool llavascript app", context);
const builder = new llvm.IRBuilder(context);

// TODO: move elsewhere
export const props = {
  context,
  builder,
  theModule,
  namedValues: {}
};

// TODO: move elsewhere
export const astHistory = [];

// TODO: move elsewhere
export function stdlib() {
  new PrototypeAST("printInt", ["n"]).codegen(props);
}

// recursive function to walk ast. turns flow ast into "Values"
// returns either Value or nothing

export default function visit(ast: any, expected: ?(string | string[])): any {
  astHistory.push(ast);

  if (expected) {
    checkIsNodeExpected(ast, astHistory, expected);
  }

  for (let [nodeType, getNode] of Object.entries(ASTNodes)) {
    if (ast.type === nodeType) {
      // $FlowFixMe: Add 'Value' type to Value getters
      const node = new getNode(ast, props);
      node.codegen(props);

      return node;
    }
  }

  // TODO: better reporting of this
  console.log(ast);
  throw "I don't understand this node yet!";
}
