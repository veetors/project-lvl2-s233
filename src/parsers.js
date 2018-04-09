import { safeLoad } from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.yml': safeLoad,
  '.ini': ini.parse,
};

export default format => (data) => {
  const parse = parsers[format];
  if (!parse) {
    throw new Error(`unknow format: ${format}`);
  }
  return parse(data);
};
