// @flow
export function assertASTNodeType (node: any, type: string) {
  if (node.type !== type) {
    throw `Node is type ${node.type} - expected ${type}!`;
  }
}

export function checkIsNodeExpected (ast: any, astHistory: any, expected: (string|string[])) {
  let allowedArray = expected;

  if (!Array.isArray(expected)) {
      allowedArray = [expected];
  }

  if (!allowedArray.includes(ast.type)) {
    // for ease of debugging, print out the ast parsing history
    astHistory.forEach(ast => {
      console.log('===============');
      console.log(ast);
    })

    throw `${ast.type} is not in ${allowedArray.toString()}!`;
  }
}
