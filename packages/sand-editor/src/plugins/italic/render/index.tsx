import * as React from 'react';
import { MARKS } from '../../../constants';

export function renderMark(props, editor, next) {
  const { children, mark, attributes } = props;

  if (mark.type === MARKS.ITALIC) {
    return <em {...attributes}>{children}</em>;
  }

  return next();
}
