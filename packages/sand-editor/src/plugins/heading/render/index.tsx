import * as React from 'react';
import { BLOCKS } from '../../../constants';

const {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
} = BLOCKS;

export function createBlockRenderer(options) {
  const { enabledHeadings } = options;

  return function renderBlock(props, editor, next) {
    const { children, node, attributes } = props;
    const { type } = node;
    let level;
    let Heading;

    // 逻辑有冗余
    switch (type) {
      case HEADING_1:
      case HEADING_2:
      case HEADING_3:
      case HEADING_4:
      case HEADING_5:
      case HEADING_6:
        // eslint-disable-next-line
        level = type.split('-')[1];
        Heading = `h${level}`;

        if (enabledHeadings.indexOf(type) > -1) {
          return <Heading {...attributes}>{children}</Heading>;
        }

        return next();
      default:
        return next();
    }
  };
}
