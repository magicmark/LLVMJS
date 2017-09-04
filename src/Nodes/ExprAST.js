// @flow
type Value = ?string;

/**
 * Base class for all expression nodes
 */
export interface ExprAST {
    codegen({
      context: any,
      namedValues: any,
      builder: any,
      theModule: any,
    }): Value;
};
