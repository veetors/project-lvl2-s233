import _ from 'lodash';

const renderPlainDiff = (diffTree) => {
  const buildPropertyLines = (tree, ancestors = []) => {
    const buildKeyLine = (item) => {
      if (_.isEmpty(ancestors)) {
        return item;
      }

      return `${ancestors.join('.')}.${item}`;
    };

    const buildValueLine = item => (_.isObject(item) ? 'complex value' : `'${item}'`);

    const result = _.flatten(tree.map((node) => {
      const {
        type,
        key,
        value,
        previousValue,
        children,
      } = node;

      const typeActions = {
        nested: () => buildPropertyLines(children, [...ancestors, key]),
        unchanged: () => null,
        changed: () => `${buildKeyLine(key)}' was updated. From ${buildValueLine(previousValue)} to ${buildValueLine(value)}`,
        added: () => {
          const valueLine = buildValueLine(value);
          return `${buildKeyLine(key)}' was added with ${valueLine === 'complex value' ? valueLine : `value: ${valueLine}`}`;
        },
        removed: () => `${buildKeyLine(key)}' was removed`,
      };

      const getPropertyLine = nodeType => typeActions[nodeType]();

      return getPropertyLine(type);
    })).filter(v => v);

    return result;
  };

  const result = buildPropertyLines(diffTree).map(item => `  Property '${item}`).join('\n');

  return `{\n${result}\n}`;
};

export default renderPlainDiff;
