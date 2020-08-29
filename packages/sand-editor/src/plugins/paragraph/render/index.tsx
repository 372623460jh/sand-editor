import * as React from 'react';
import { BLOCKS } from '../../../constants';
import { getCommonStyle } from '../utils';

export function renderBlock(props, editor, next) {
  const { node, attributes, children } = props;
  // p 的 render
  if (node.type === BLOCKS.PARAGRAPH) {
    return (
      <p style={getCommonStyle(node)} {...attributes}>
        {children}
      </p>
    );
  }
  return next();
}
