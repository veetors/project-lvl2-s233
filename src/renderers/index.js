import renderInlineDiff from './renderInlineDiff';
import renderPlainDiff from './renderPlainDiff';

const renderers = {
  inline: renderInlineDiff,
  plain: renderPlainDiff,
  json: JSON.stringify,
};

export default format => (data) => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unknow format: ${format}`);
  }
  return render(data);
};
