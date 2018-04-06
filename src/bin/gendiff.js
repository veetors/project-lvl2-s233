#!/usr/bin/env node

import program from 'commander';
import genDiff from '../';

program
  .version('0.6.0')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .action((path1, path2) =>
    (program.format ?
      console.log(genDiff(path1, path2, program.format))
      :
      console.log(genDiff(path1, path2))))
  .parse(process.argv);
