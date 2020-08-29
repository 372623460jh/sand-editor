import HTMLSerializer from '@jianghe/slate-html-serializer';

/**
 * 创建 HTML Serializer 实例
 * @param plugins
 * @param rules
 * @param restOptions
 * @returns {HTMLSerializer}
 */
function createHTMLSerializer({
  plugins = [],
  rules = [],
  ...restOptions
} = {}) {
  const pluginRules = [];

  plugins.forEach((plugin) => {
    if (plugin.htmlRule) {
      pluginRules.push(plugin.htmlRule);
    }
  });

  return new HTMLSerializer({
    rules: [...rules, ...pluginRules],
    ...restOptions,
  });
}

export { createHTMLSerializer, HTMLSerializer };
