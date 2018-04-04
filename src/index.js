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

const getLineFromObject = (obj) => {
  const keys = _.keys(obj);

  return keys.map(key => `${key}: ${obj[key]}`).join('\n');
};

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const tree = _.flatten(keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        const children = buildDiffTree(value1, value2);

        return { key, type: 'unchanged', children };
      } else if (_.isObject(value1) || _.isObject(value2)) {
        return [
          { key, type: 'removed', value: value1 },
          { key, type: 'added', value: value2 },
        ];
      }

      if (value1 !== value2) {
        return [
          { key, type: 'removed', value: value1 },
          { key, type: 'added', value: value2 },
        ];
      }

      return { key, type: 'unchanged', value: value2 };
    }

    if (_.has(obj1, key)) {
      return { key, type: 'removed', value: value1 };
    }

    return { key, type: 'added', value: value2 };
  }));

  return tree;
};

const buildDiffLine = (diffTree, spaces = 0) => {
  const result = diffTree.map((node) => {
    const {
      type,
      key,
      value,
      children,
    } = node;

    if (children) {
      return `${'  '.repeat(spaces)}    ${key}: ${buildDiffLine(children, spaces + 2)}`;
    }

    if (_.isObject(value)) {
      if (type === 'removed') {
        return `${'  '.repeat(spaces)}  - ${key}: ${`{\n${'  '.repeat(spaces + 4)}${getLineFromObject(value)}\n${'  '.repeat(spaces + 2)}}`}`;
      } else if (type === 'added') {
        return `${'  '.repeat(spaces)}  + ${key}: ${`{\n${'  '.repeat(spaces + 4)}${getLineFromObject(value)}\n${'  '.repeat(spaces + 2)}}`}`;
      }

      return `${'  '.repeat(spaces)}    ${key}: ${`{\n${'  '.repeat(spaces + 4)}${getLineFromObject(value)}\n${'  '.repeat(spaces + 2)}}`}`;
    }

    if (type === 'removed') {
      return `${'  '.repeat(spaces)}  - ${key}: ${value}`;
    } else if (type === 'added') {
      return `${'  '.repeat(spaces)}  + ${key}: ${value}`;
    }

    return `${'  '.repeat(spaces)}    ${key}: ${value}`;
  }).join('\n');

  return `{\n${result}\n${'  '.repeat(spaces)}}`;
};

const genDiff = (path1, path2) => {
  const ext = path.extname(path1);
  const parse = parsers[ext];
  const content1 = parse(fs.readFileSync(path1, 'utf-8'));
  const content2 = parse(fs.readFileSync(path2, 'utf-8'));

  const result = buildDiffTree(content1, content2);
  const resultLine = buildDiffLine(result);

  return resultLine;
};

export default genDiff;
