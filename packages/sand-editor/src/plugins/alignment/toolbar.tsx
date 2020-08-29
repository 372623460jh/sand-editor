/* eslint-disable react/display-name */
import * as React from 'react';
import AlignLeft from './components/AlignLeft';
import AlignCenter from './components/AlignCenter';
import AlignRight from './components/AlignRight';
import AlignJustify from './components/AlignJustify';
import AlignmentDropdown from './components/AlignmentDropdown';
import { BLOCKS } from '../../constants';

const { ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, ALIGN_JUSTIFY } = BLOCKS;

const ALIGN_LIST = {
  [ALIGN_LEFT]: {
    key: ALIGN_LEFT,
    label: '左对齐',
    tip: '左对齐',
    icon: 'align-left',
  },
  [ALIGN_CENTER]: {
    key: ALIGN_CENTER,
    label: '居中',
    tip: '居中',
    icon: 'align-center',
  },
  [ALIGN_RIGHT]: {
    key: ALIGN_RIGHT,
    label: '右对齐',
    tip: '右对齐',
    icon: 'align-right',
  },
  [ALIGN_JUSTIFY]: {
    key: ALIGN_JUSTIFY,
    label: '两端对齐',
    tip: '两端对齐',
    icon: 'align-justify',
  },
};

export default function toolbar(options) {
  const { alignmentList = [] } = options;
  const realList = [];
  alignmentList.forEach((alignment) => {
    ALIGN_LIST[alignment] && realList.push(ALIGN_LIST[alignment]);
  });

  return {
    button: (props) => (
      <AlignmentDropdown alignmentList={realList} {...props} />
    ),
    [ALIGN_LEFT]: AlignLeft,
    [ALIGN_CENTER]: AlignCenter,
    [ALIGN_RIGHT]: AlignRight,
    [ALIGN_JUSTIFY]: AlignJustify,
  };
}
