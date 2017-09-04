// @flow
function bar(n: number): number {
  // $FlowFixMe: part of the stdlib :)
  const foo = printInt(n);
  return 1;
}

function main(): number {
  const foo = 3;
  const ret = bar(foo);
  return ret;
}
