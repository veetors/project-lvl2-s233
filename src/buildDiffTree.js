import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const tree = keys.map((key) => {
    const beforeValue = obj1[key];
    const afterValue = obj2[key];

    const propertyActions = [
      {
        check: () => _.has(obj1, key) && !_.has(obj2, key),
        action: () => ({ type: 'removed', value: beforeValue }),
      },
      {
        check: () => !_.has(obj1, key) && _.has(obj2, key),
        action: () => ({ type: 'added', value: afterValue }),
      },
      {
        check: () => _.isObject(beforeValue) && _.isObject(afterValue),
        action: () =>
          ({ type: 'nested', children: buildDiffTree(beforeValue, afterValue) }),
      },
      {
        check: () => beforeValue === afterValue,
        action: () => ({ type: 'unchanged', value: afterValue }),
      },
      {
        check: () => beforeValue !== afterValue,
        action: () => ({ type: 'changed', value: afterValue, previousValue: beforeValue }),
      },
    ];

    const { action } = _.find(propertyActions, ({ check }) => check());

    return { key, ...action() };
  });

  return tree;
};

export default buildDiffTree;
