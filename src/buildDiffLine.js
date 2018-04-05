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

export default buildDiffLine;
