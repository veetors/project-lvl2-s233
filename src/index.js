import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

const comparator = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const jointKeys = [...new Set([...keys1, ...keys2])];

  const result = _.flatten(jointKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      return value1 === value2 ?
        `    ${key}: ${value1}`
        :
        [`  + ${key}: ${value2}`, `  - ${key}: ${value1}`];
    }

    return _.has(obj1, key) ?
      `  - ${key}: ${value1}`
      :
      `  + ${key}: ${value2}`;
  })).join('\n');

  return `{\n${result}\n}`;
};

const genDiff = (path1, path2) => {
  const ext = path.extname(path1);
  const parse = parsers[ext];
  const content1 = parse(fs.readFileSync(path1, 'utf-8'));
  const content2 = parse(fs.readFileSync(path2, 'utf-8'));
  const result = comparator(content1, content2);

  console.log(result);
  return result;
};

export default genDiff;
