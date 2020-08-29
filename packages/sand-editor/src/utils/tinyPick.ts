export function tinyPickBy(object, props, predicate) {
  let index = -1;
  const { length } = props;
  const result = {};

  while (++index < length) {
    const key = props[index];
    const value = object[key];

    if (predicate(value, key)) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * tinyPick({a: 1, b: 2}, ['a']) => {a: 1}
 * @param {Object} object - 参考对象
 * @param {Array} props - 挑选的属性
 */
export function tinyPick(object = {}, props = []) {
  return tinyPickBy(object, props, function predicate(value, key) {
    return key in object;
  });
}
