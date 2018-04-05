import _ from 'lodash';

const buildDiffTree = (obj1, obj2, parent) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const tree = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const node = { parent, key };

    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        const children = buildDiffTree(value1, value2, key);

        return { ...node, type: 'unchangedParent', children };
      }

      if (value1 !== value2) {
        return {
          ...node,
          type: 'changed',
          value: value2,
          previousValue: value1,
        };
      }

      return { ...node, type: 'unchanged', value: value2 };
    }

    if (_.has(obj1, key)) {
      return { ...node, type: 'removed', value: value1 };
    }

    return { ...node, type: 'added', value: value2 };
  });

  return tree;
};

export default buildDiffTree;
