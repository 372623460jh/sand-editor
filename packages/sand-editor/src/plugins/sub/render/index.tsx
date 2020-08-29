import * as React from 'react';

export function createSupRenderer(options = {}) {
  return function renderMark(props, editor, next) {
    const { children, mark, attributes } = props;

    // @ts-ignore
    if (mark.type === options.type) {
      return <sub {...attributes}>{children}</sub>;
    }

    return next();
  };
}
