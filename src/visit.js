// @flow
import * as llvm from "llvm-node";

import * as ValueTypes from "./Values";
import { checkIsNodeExpected } from './util';
import PrototypeAST from "./Nodes/PrototypeAST";

const context = new llvm.LLVMContext();
const theModule = new llvm.Module("my cool llavascript app", context);
const builder = new llvm.IRBuilder(context);
export const props = {
  context,
  builder,
  theModule,
  namedValues: {}
};

export const astHistory = [];

export function stdlib () {
  new PrototypeAST('printInt', ['n']).codegen(props);
};

// recursive function to walk ast. turns flow ast into "Values"
// returns either Value or nothing

export default function visit(ast: any, expected: ?(string|string[])): any {
  astHistory.push(ast);

  if (expected) {
    checkIsNodeExpected(ast, astHistory, expected);
  }

  for (let [valueType, getValue] of Object.entries(ValueTypes)) {
    if (ast.type === valueType) {
      // $FlowFixMe: Add 'Value' type to Value getters
      const node = new getValue(ast, props);
      node.codegen(props);

      return node;
    }
  }

  console.log(ast);
  throw "I don't understand this node yet!";
};
