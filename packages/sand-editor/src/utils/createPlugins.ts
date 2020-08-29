import * as plugins from '../plugins';

/**
 * 初始化插件
 * @param options
 * @param extraPlugins 扩展插件(必须以key:function)的形式，和sand-editor默认插件重名会被覆盖
 * @returns {{array: any[], map}}
 */
export default function createPlugins(options = {}, extraPlugins = {}) {
  const allPlugins = { ...plugins, ...extraPlugins };

  const pluginMap = {};
  const pluginArray = Object.keys(allPlugins).map((key) => {
    const pluginFn = allPlugins[key];
    let instance = {};

    // 开发环境容错
    if (typeof pluginFn === 'function') {
      // options 为 { plugin: options } 形式的 k-v
      instance = allPlugins[key](options[key]);
      pluginMap[key] = instance;
    }

    return instance;
  });

  return {
    array: pluginArray,
    map: pluginMap,
  };
}
