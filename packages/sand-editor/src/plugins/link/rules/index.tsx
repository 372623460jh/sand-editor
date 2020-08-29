import * as React from 'react';
import { nodeStyleAndAttrs } from '../../../utils';
import { INLINES, SLATE_OBJECT_TYPES } from '../../../constants';

const { INLINE } = SLATE_OBJECT_TYPES;
const { LINK } = INLINES;

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const isLink = el.tagName.toLowerCase() === LINK;
      if (isLink) {
        return {
          object: INLINE,
          type: LINK,
          nodes: next(el.childNodes),
          data: nodeStyleAndAttrs(el),
        };
      }
    },

    serialize(obj, children) {
      if (obj.object === INLINE && obj.type === LINK) {
        return <a {...obj.data.get('attrs')}>{children}</a>;
      }
    },
  };
}
