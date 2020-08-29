import * as React from 'react';
import { MARKS } from '../../../constants';

export function renderMark(props, editor, next) {
  const { children, mark, attributes } = props;
  if (mark.type === MARKS.STRIKETHROUGH) {
    // 下划线的颜色跟随子节点的颜色
    const childColor =
      children &&
      children.props &&
      children.props.style &&
      children.props.style.color;
    return (
      <del {...attributes} style={childColor ? { color: childColor } : {}}>
        {children}
      </del>
    );
  }
  return next();
}
