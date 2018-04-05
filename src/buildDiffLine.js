import _ from 'lodash';

const getLineFromObject = (obj) => {
  const keys = _.keys(obj);

  return keys.map(key => `${key}: ${obj[key]}`).join('\n');
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

    const typeActions = {
      unchangedParent: () => `${getSpacesQuantity()}    ${key}: ${buildDiffLine(children, spaces + 2)}`,
      unchanged: () => `${getSpacesQuantity()}    ${key}: ${buildValueLine(value)}`,
      changed: () => [
        `${getSpacesQuantity()}  ${sings.removed} ${key}: ${buildValueLine(previousValue)}`,
        `${getSpacesQuantity()}  ${sings.added} ${key}: ${buildValueLine(value)}`,
      ],
      added: () => `${getSpacesQuantity()}  ${sings[type]} ${key}: ${buildValueLine(value)}`,
      removed: () => `${getSpacesQuantity()}  ${sings[type]} ${key}: ${buildValueLine(value)}`,
    };

    const getPropertyLines = nodeType => typeActions[nodeType]();

    return getPropertyLines(type);
  })).join('\n');

  return `{\n${result}\n${getSpacesQuantity()}}`;
};

export default buildDiffLine;
