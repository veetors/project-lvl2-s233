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

        return { key, type: 'unchangedParent', children };
      }

      if (value1 !== value2) {
        const node = {
          key,
          type: 'changed',
          value: value2,
          previousValue: value1,
        };

        return node;
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
  const getSpacesQuantity = (repeatValue = spaces) => '  '.repeat(repeatValue);

  const buildValueLine = (item) => {
    if (_.isObject(item)) {
      return `{\n${getSpacesQuantity(spaces + 4)}${getLineFromObject(item)}\n${getSpacesQuantity(spaces + 2)}}`;
    }

    return item;
  };

  const sings = { added: '+', removed: '-' };

  const result = _.flatten(diffTree.map((node) => {
    const {
      type,
      key,
      value,
      previousValue,
      children,
    } = node;

    if (type === 'unchangedParent') {
      return `${getSpacesQuantity()}    ${key}: ${buildDiffLine(children, spaces + 2)}`;
    } else if (type === 'unchanged') {
      return `${getSpacesQuantity()}    ${key}: ${buildValueLine(value)}`;
    } else if (type === 'changed') {
      return [
        `${getSpacesQuantity()}  ${sings.removed} ${key}: ${buildValueLine(previousValue)}`,
        `${getSpacesQuantity()}  ${sings.added} ${key}: ${buildValueLine(value)}`,
      ];
    }

    return `${getSpacesQuantity()}  ${sings[type]} ${key}: ${buildValueLine(value)}`;
  })).join('\n');

  return `{\n${result}\n${getSpacesQuantity()}}`;
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
