import * as React from 'react';
import { SLATE_OBJECT_TYPES } from '../../../constants';
import { nodeAttrsToObject, nodeStyleToObject } from '../../../utils';

const { INLINE } = SLATE_OBJECT_TYPES;

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const tag = el.tagName && el.tagName.toLowerCase();

      if (tag === 'img') {
        return {
          object: INLINE,
          type: options.type,
          nodes: next(el.childNodes),
          data: {
            style: nodeStyleToObject(el),
            attrs: nodeAttrsToObject(el),
          },
          isVoid: true,
        };
      }
    },
    // eslint-disable-next-line no-unused-vars
    serialize(obj) {
      if (obj.object === INLINE && obj.type === options.type) {
        return <img {...obj.data.get('attrs')} style={obj.data.get('style')} />; // eslint-disable-line
      }
    },
  };
}
