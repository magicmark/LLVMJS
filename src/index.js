// @flow
import * as llvm from "llvm-node";

import fs from 'fs';
import path from 'path';
import { parse } from 'flow-parser';

import visit, { props, stdlib } from './visit'

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, file) => {
  const ast = parse(file, {});

  stdlib();
  visit(ast, "Program");

  console.log(props.theModule.print());
  llvm.writeBitcodeToFile(props.theModule, filePath.replace('.js', '.bc'));
});
