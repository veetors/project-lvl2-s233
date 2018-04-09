import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const tree = keys.map((key) => {
    const beforeValue = obj1[key];
    const afterValue = obj2[key];

    const propertyActions = [
      {
        check: () => _.has(obj1, key) && !_.has(obj2, key),
        action: () => ({ key, type: 'removed', value: beforeValue }),
      },
      {
        check: () => !_.has(obj1, key) && _.has(obj2, key),
        action: () => ({ key, type: 'added', value: afterValue }),
      },
      {
        check: () => _.isObject(beforeValue) && _.isObject(afterValue),
        action: () =>
          ({ key, type: 'nested', children: buildDiffTree(beforeValue, afterValue, key) }),
      },
      {
        check: () => beforeValue === afterValue,
        action: () => ({ key, type: 'unchanged', value: afterValue }),
      },
      {
        check: () => beforeValue !== afterValue,
        action: () => ({
          key,
          type: 'changed',
          value: afterValue,
          previousValue: beforeValue,
        }),
      },
    ];

    const currentType = _.find(propertyActions, o => o.check());

    return currentType.action();
  });

  return tree;
};

export default buildDiffTree;
