import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import buildDiffTree from './buildDiffTree';
import { renderInlineDiff, renderPlainDiff } from './renderers';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const renderers = {
  inline: renderInlineDiff,
  plain: renderPlainDiff,
};

const genDiff = (path1, path2, format = 'inline') => {
  const ext = path.extname(path1);
  const parse = parsers[ext];
  const render = renderers[format];
  const content1 = parse(fs.readFileSync(path1, 'utf-8'));
  const content2 = parse(fs.readFileSync(path2, 'utf-8'));
  const diffTree = buildDiffTree(content1, content2);

  return render(diffTree);
};

export default genDiff;
