export function noop() {}

/**
 * 对象 key-value 互换
 * @param origin
 */
export function invert(origin = {}) {
  const ret = {};

  Object.keys(origin).forEach((key) => {
    ret[origin[key]] = key;
  });

  return ret;
}

/**
 * Map转成Object
 * @param {Map} map
 */
export function mapToObject(map) {
  const obj = {};
  map.forEach((value, key) => {
    // eslint-disable-next-line
    return (obj[key] = value);
  });
  return obj;
}

/**
 * 字符串改成驼峰式
 * @param {String} str 字符串
 */
export function camelCase(str) {
  return str.replace(/-([\w])/g, (match, w) => w.toUpperCase());
}

/**
 * 驼峰式字符串改成连接符形式
 * @param {String} str 字符串
 */
export function kebabCase(str) {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
