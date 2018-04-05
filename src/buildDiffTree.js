import _ from 'lodash';

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

export default buildDiffTree;
