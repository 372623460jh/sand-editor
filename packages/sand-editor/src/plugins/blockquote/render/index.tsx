import * as React from 'react';
import { BLOCKS } from '../../../constants';

export function renderBlock(props, editor, next) {
  const { children, node, attributes } = props;

  if (node.type === BLOCKS.BLOCKQUOTE) {
    return <blockquote {...attributes}>{children}</blockquote>;
  }

  return next();
}
