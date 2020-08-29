import ErrorBoundaryPlugin from '../plugins/error-boundary';
import BasicPlugin from '../plugins/basic';

const { toString } = Object.prototype;

// 统一注册的插件，使用 Map 保证顺序，先注册的优先级更高
const plugins: any = new Map();
// 前置插件
const prePlugins: any = new Map();

prePlugins.set('error-boundary', ErrorBoundaryPlugin);
prePlugins.set('basic', BasicPlugin);

/**
 * 注册插件
 * @description 注册过的插件插件会应用于所有实例
 * @param name {String | Object}
 * @param fn
 */
export function registerPlugin(name, fn: () => void | undefined) {
  // 传入的对象
  if (toString.call(name) === '[object Object]') {
    return Object.keys(name).forEach((key) => {
      registerPlugin(key, name[key]);
    });
  }

  // 注册单个插件
  if (typeof name === 'string' && typeof fn === 'function') {
    plugins.set(name, fn);
  }
}

/**
 * 撤销插件注册
 * @param name {String | Array<String>}
 */
export function deregisterPlugin(name) {
  if (Array.isArray(name)) {
    return name.every((plugin) => {
      return deregisterPlugin(plugin);
    });
  }

  return plugins.delete(name);
}

/**
 * 初始化插件
 * @param options {Object}
 * @param extraPlugins {Object | Map}, 扩展插件， `{ key: fn }` 或 Map，会覆盖已注册的同名插件
 * @returns {{array: Object[], map: Object}}
 */
export function createPlugins(options = {}, extraPlugins: any = {}) {
  const isMap = toString.call(extraPlugins) === '[object Map]';
  // const isObj = toString.call(extraPlugins) === '[object Object]';
  // 如果插件对顺序敏感，可以使用 map，不敏感则用对象
  const extraArray = isMap
    ? [...extraPlugins]
    : Object.keys(extraPlugins).map((k) => [k, extraPlugins[k]]);
  const allPlugins = new Map([...prePlugins, ...plugins, ...extraArray]);

  const pluginMap = Object.create(null);
  const pluginArray = [];

  allPlugins.forEach((fn, name) => {
    let instance = Object.create(null);

    // 开发环境容错
    if (typeof fn === 'function') {
      // options 为 { pluginName: {} } 形式的 k-v
      // @ts-ignore
      instance = fn(options[name]);
      // @ts-ignore
      pluginMap[name] = instance;
      pluginArray.push(instance);
    }
  });

  return {
    array: pluginArray,
    map: pluginMap,
  };
}
