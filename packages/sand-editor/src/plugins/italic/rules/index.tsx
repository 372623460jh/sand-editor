import * as React from 'react';
import { MARKS, SLATE_OBJECT_TYPES } from '../../../constants';

const { ITALIC } = MARKS;
const ITALIC_TAGS = {
  i: ITALIC,
  em: ITALIC,
};

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const type = ITALIC_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: 'mark',
          type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === SLATE_OBJECT_TYPES.MARK) {
        if (obj.type === ITALIC) {
          return <em>{children}</em>;
        }
      }
    },
  };
}
