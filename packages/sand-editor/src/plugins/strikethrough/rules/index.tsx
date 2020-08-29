import * as React from 'react';
import { MARKS, SLATE_OBJECT_TYPES } from '../../../constants';

const { STRIKETHROUGH } = MARKS;
const { MARK } = SLATE_OBJECT_TYPES;

/**
 * del标签和s标签都当做中划线处理
 */
const STRIKETHROUGH_TAGS = {
  del: STRIKETHROUGH,
  s: STRIKETHROUGH,
};

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const type = STRIKETHROUGH_TAGS[el.tagName.toLowerCase()];
      if (type) {
        return {
          object: MARK,
          type: STRIKETHROUGH,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === MARK) {
        if (obj.type === STRIKETHROUGH) {
          // 序列化时下划线的颜色跟随子节点的颜色
          const childColor =
            children &&
            children.props &&
            children.props.style &&
            children.props.style.color;
          return (
            <del style={childColor ? { color: childColor } : {}}>
              {children}
            </del>
          );
        }
      }
    },
  };
}
