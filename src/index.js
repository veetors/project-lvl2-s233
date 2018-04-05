import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import buildDiffTree from './buildDiffTree';
import buildDiffLine from './buildDiffLine';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const genDiff = (path1, path2) => {
  const ext = path.extname(path1);
  const parse = parsers[ext];
  const content1 = parse(fs.readFileSync(path1, 'utf-8'));
  const content2 = parse(fs.readFileSync(path2, 'utf-8'));
  const diffTree = buildDiffTree(content1, content2);

  return buildDiffLine(diffTree);
};

export default genDiff;
