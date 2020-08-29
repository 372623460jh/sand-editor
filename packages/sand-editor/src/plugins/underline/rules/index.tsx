import * as React from 'react';
import { MARKS, SLATE_OBJECT_TYPES } from '../../../constants';

const { UNDERLINE } = MARKS;
const { MARK } = SLATE_OBJECT_TYPES;

const UNDERLINE_TAGS = {
  u: UNDERLINE,
};

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createHtmlRule(options) {
  return {
    deserialize(el, next) {
      const type = UNDERLINE_TAGS[el.tagName.toLowerCase()];

      if (type) {
        return {
          object: MARK,
          type: UNDERLINE,
          nodes: next(el.childNodes),
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === MARK) {
        if (obj.type === UNDERLINE) {
          // 序列化时下划线的颜色跟随子节点的颜色
          const childColor =
            children &&
            children.props &&
            children.props.style &&
            children.props.style.color;
          return (
            <u style={childColor ? { color: childColor } : {}}>{children}</u>
          );
        }
      }
    },
  };
}
