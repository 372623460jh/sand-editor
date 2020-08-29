import * as React from 'react';
import { BLOCKS, SLATE_OBJECT_TYPES } from '../../../constants';

const { BLOCKQUOTE } = BLOCKS;
const { BLOCK } = SLATE_OBJECT_TYPES;
const UNDERLINE_TAGS = {
  blockquote: BLOCKQUOTE,
};

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const type = UNDERLINE_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: BLOCK,
          type: BLOCKQUOTE,
          nodes: next(el.childNodes),
        };
      }
    },
    // eslint-disable-next-line no-unused-vars
    serialize(obj, children) {
      if (obj.object === BLOCK && obj.type === BLOCKQUOTE) {
        return (
          <blockquote
            style={{
              borderLeft: '3px solid rgb(204, 204, 204)',
              paddingLeft: '0.625em',
            }}
          >
            {children}
          </blockquote>
        );
      }
    },
  };
}
