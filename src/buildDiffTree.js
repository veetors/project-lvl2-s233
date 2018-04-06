import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const tree = keys.map((key) => {
    const beforeValue = obj1[key];
    const afterValue = obj2[key];

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(beforeValue) && _.isObject(afterValue)) {
        const children = buildDiffTree(beforeValue, afterValue, key);

        return { key, type: 'nested', children };
      }

      if (beforeValue !== afterValue) {
        return {
          key,
          type: 'changed',
          value: afterValue,
          previousValue: beforeValue,
        };
      }

      return { key, type: 'unchanged', value: afterValue };
    }

    if (_.has(obj1, key)) {
      return { key, type: 'removed', value: beforeValue };
    }

    return { key, type: 'added', value: afterValue };
  });

  return tree;
};

export default buildDiffTree;
