import fs from 'fs';
import _ from 'lodash';

export const objToString = (obj) => {
  const result = Object.keys(obj)
    .reduce((acc, key) => `${acc}  ${key}: ${obj[key]}\n`, '');

  return `{\n${result}}`;
};

const getDiffObj = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const commonKeys = [...new Set([...keys1, ...keys2])];

  const result = commonKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      return value1 === value2 ?
        { ...acc, [`  ${key}`]: value1 }
        :
        { ...acc, [`+ ${key}`]: value2, [`- ${key}`]: value1 };
    }

    return _.has(obj1, key) ?
      { ...acc, [`- ${key}`]: value1 }
      :
      { ...acc, [`+ ${key}`]: value2 };
  }, {});

  return result;
};

const genDiff = (path1, path2) => {
  const content1 = JSON.parse(fs.readFileSync(path1));
  const content2 = JSON.parse(fs.readFileSync(path2));
  const diffObj = getDiffObj(content1, content2);
  const result = objToString(diffObj);

  console.log(result);
  return result;
};

export default genDiff;
