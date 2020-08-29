import React from 'react';
import ParagraphBothEndsPaddingDropdown from '../components/ParagraphBothEndsPaddingDropdown';

import BLOCKS from '../../../constants/blocks';

const { PARAGRAPH_BOTH_ENDS_PADDING } = BLOCKS;

/**
 * 定义编辑器工具栏组件
 * @param options
 */
export default function toolbar(options) {
  const { paragraphBothEndsPaddingList = [] } = options;

  const realList = paragraphBothEndsPaddingList.map((size) => ({
    key: `${size}px`,
    label: size,
  }));

  return {
    button: (props) => (
      <ParagraphBothEndsPaddingDropdown
        psType={PARAGRAPH_BOTH_ENDS_PADDING}
        psList={realList}
        {...props}
      />
    ),
  };
}
