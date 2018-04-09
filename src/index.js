import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getRender from './renderers';
import buildDiffTree from './buildDiffTree';

const genDiff = (path1, path2, format = 'inline') => {
  const ext = path.extname(path1);
  const parse = getParser(ext);
  const render = getRender(format);
  const content1 = parse(fs.readFileSync(path1, 'utf-8'));
  const content2 = parse(fs.readFileSync(path2, 'utf-8'));
  const diffTree = buildDiffTree(content1, content2);

  return render(diffTree);
};

export default genDiff;
