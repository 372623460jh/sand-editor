import * as React from 'react';

export function createBoldRenderer(options = {}) {
  return function renderMark(props, editor, next) {
    const { children, mark, attributes } = props;

    // @ts-ignore
    if (mark.type === options.type) {
      return <strong {...attributes}>{children}</strong>;
    }

    return next();
  };
}
