import _ from 'lodash';

const getLineFromObject = obj => _.keys(obj)
  .map(key => `${key}: ${obj[key]}`)
  .join('\n');

const getIndent = repeatValue => '  '.repeat(repeatValue);

const renderInlineDiff = (diffTree, spaces = 0) => {
  const buildValueLine = (item) => {
    if (_.isObject(item)) {
      return `{\n${getIndent(spaces + 4)}${getLineFromObject(item)}\n${getIndent(spaces + 2)}}`;
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

    const typeActions = {
      nested: () => `${getIndent(spaces)}    ${key}: ${renderInlineDiff(children, spaces + 2)}`,
      unchanged: () => `${getIndent(spaces)}    ${key}: ${buildValueLine(value)}`,
      changed: () => [
        `${getIndent(spaces)}  ${sings.removed} ${key}: ${buildValueLine(previousValue)}`,
        `${getIndent(spaces)}  ${sings.added} ${key}: ${buildValueLine(value)}`,
      ],
      added: () => `${getIndent(spaces)}  ${sings[type]} ${key}: ${buildValueLine(value)}`,
      removed: () => `${getIndent(spaces)}  ${sings[type]} ${key}: ${buildValueLine(value)}`,
    };

    const getPropertyLine = nodeType => typeActions[nodeType]();

    return getPropertyLine(type);
  })).join('\n');

  return `{\n${result}\n${getIndent(spaces)}}`;
};

export default renderInlineDiff;
