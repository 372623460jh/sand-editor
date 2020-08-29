import * as React from 'react';
import { BLOCKS } from '../../../constants';

export function renderBlock(props, editor, next) {
  // eslint-disable-next-line no-unused-vars
  const { children, node, attributes } = props;

  if (node.type === BLOCKS.HR) {
    return <hr {...attributes} />;
  }

  return next();
}
