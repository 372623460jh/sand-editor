import { camelCase } from './common';

// 节点属性转成一个对象返回
export function nodeAttrsToObject(node) {
  if (node instanceof HTMLElement) {
    const attrs = Object.values(node.attributes);
    const res = attrs.reduce((result, attr) => {
      let name = camelCase(attr.name);

      // ignore style
      if (name === 'style') {
        return result;
      }

      // class to className
      if (name === 'class') {
        name = 'className';
      }

      result[name] = attr.value; // eslint-disable-line
      return result;
    }, {});

    return res;
  }
  throw new Error('argument must be HTMLElement');
}

// 获取style字符，转成一个对象返回
export function nodeStyleToObject(node) {
  if (node instanceof HTMLElement) {
    let result = {};
    const styleStr = node.getAttribute('style');

    if (!styleStr) {
      return result;
    }

    result = styleStr.split(';').reduce((res, attr) => {
      const attrStr = attr.trim();
      if (attrStr.length) {
        let [key, value] = attrStr.split(':');
        if (key.length && value.length) {
          key = camelCase(key.trim());
          value = value.trim();
          res[key] = value.trim();
        }
      }
      return res;
    }, {});

    return result;
  }
  throw new Error('argument must be HTMLElement');
}

// 返回节点的attrs 和 style 对象
export function nodeStyleAndAttrs(el) {
  return {
    attrs: nodeAttrsToObject(el),
    style: nodeStyleToObject(el),
  };
}
