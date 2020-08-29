import React from 'react';
import ParagraphSpacingDropdown from '../components/ParagraphSpacingDropdown';

import BLOCKS from '../../../constants/blocks';

const { PARAGRAPH_SPACING_TOP, PARAGRAPH_SPACING_BOTTOM } = BLOCKS;

export default function toolbar(options) {
  const {
    paragraphSpacingTopList = [],
    paragraphSpacingBottomList = [],
  } = options;

  const topRealList = [];
  const bottomRealList = [];

  // 处理段前距入参
  paragraphSpacingTopList.forEach((topSize) => {
    topRealList.push({
      key: `paragraph_spacing_${topSize}px`,
      label: `${topSize}`,
    });
  });

  // 处理段后距入参
  paragraphSpacingBottomList.forEach((bottomSize) => {
    bottomRealList.push({
      key: `paragraph_spacing_${bottomSize}px`,
      label: `${bottomSize}`,
    });
  });

  return {
    [PARAGRAPH_SPACING_TOP]: (props) => (
      <ParagraphSpacingDropdown
        psType={PARAGRAPH_SPACING_TOP}
        psList={topRealList}
        {...props}
      />
    ),
    [PARAGRAPH_SPACING_BOTTOM]: (props) => (
      <ParagraphSpacingDropdown
        psType={PARAGRAPH_SPACING_BOTTOM}
        psList={bottomRealList}
        {...props}
      />
    ),
  };
}
