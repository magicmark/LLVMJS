// @flow

// TODO: move this inline
import { assertASTNodeType } from "../util";

// /**
//  * Base class for all expression nodes
//  */
// type props ASTNode {
//     codegen({
//       context: any,
//       namedValues: any,
//       builder: any,
//       theModule: any,
//     }): Value;
// };

export type Props = {
  context: any,
  namedValues: any,
  builder: any,
  theModule: any
};

export default class ASTNode {
  llvmValue: ?any;
  ast: any;

  constructor(ast: any) {
    assertASTNodeType(ast, this.constructor.name);
    this.ast = ast;
  }
}
