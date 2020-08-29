import * as React from 'react';
import { BLOCKS, SLATE_OBJECT_TYPES } from '../../../constants';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
const { HR } = BLOCKS;
const { BLOCK } = SLATE_OBJECT_TYPES;
const UNDERLINE_TAGS = {
  hr: HR,
};

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const type = UNDERLINE_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: BLOCK,
          type: HR,
          nodes: next(el.childNodes),
        };
      }
    },
    // eslint-disable-next-line no-unused-vars
    serialize(obj, children) {
      if (obj.object === BLOCK && obj.type === HR) {
        return <hr />;
      }
    },
  };
}
