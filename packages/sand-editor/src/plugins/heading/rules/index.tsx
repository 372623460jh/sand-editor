import * as React from 'react';
import { BLOCKS, SLATE_OBJECT_TYPES } from '../../../constants';
import { invert } from '../../../utils';

const {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
} = BLOCKS;
const { BLOCK } = SLATE_OBJECT_TYPES;
const HEADING_TAG_TYPES = {
  h1: HEADING_1,
  h2: HEADING_2,
  h3: HEADING_3,
  h4: HEADING_4,
  h5: HEADING_5,
  h6: HEADING_6,
};

// type: tag
const HEADING_TYPE_TAGS = invert(HEADING_TAG_TYPES);

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options) {
  const { enabledHeadings } = options;
  const isEnabled = (type) => enabledHeadings.indexOf(type) > -1;

  return {
    deserialize(el, next) {
      const type = HEADING_TAG_TYPES[el.tagName.toLowerCase()];

      if (type && isEnabled(type)) {
        return {
          object: BLOCK,
          type,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      const { object, type } = obj;

      if (object === BLOCK) {
        const Tag = HEADING_TYPE_TAGS[type];

        if (Tag && isEnabled(type)) {
          return <Tag>{children}</Tag>;
        }
      }
    },
  };
}
