import * as React from 'react';
import { MARKS } from '../../../constants';
import { getCommonStyle } from '../utils';

/**
 * 公共mark的render
 * @param {*} props
 * @param {*} editor
 * @param {*} next
 */
export default function marksRender(props, editor, next) {
  const { children, mark, attributes } = props;
  if (mark.type === MARKS.COMMON_MARK) {
    return (
      <span style={getCommonStyle(mark)} {...attributes}>
        {children}
      </span>
    );
  }
  return next();
}
