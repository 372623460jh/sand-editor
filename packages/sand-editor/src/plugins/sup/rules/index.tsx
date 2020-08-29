import * as React from 'react';

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options = {}) {
  // @ts-ignore
  const MARK_TYPE = options.type;

  const MARK_TAGS = {
    sup: MARK_TYPE,
  };

  return {
    deserialize(el, next) {
      const type = MARK_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'mark') {
        if (obj.type === MARK_TYPE) {
          return <sup>{children}</sup>;
        }
      }
    },
  };
}
