import * as React from 'react';
import { setDefaultLetterSpacing } from '../config';

import LetterSpacingDropdown from '../components/LetterSpacingDropdown';

export default function toolbar(options = {}) {
  // @ts-ignore
  const { letterSpacingList = [], defaultLetterSpacing = '0px' } = options;
  // 设置默认字体
  setDefaultLetterSpacing(defaultLetterSpacing);
  const realList = [];
  letterSpacingList.forEach((letterSpacing) => {
    realList.push({
      key: `letter_spacing_${letterSpacing}px`,
      label: `${letterSpacing}`,
    });
  });

  return {
    button: (props) => (
      <LetterSpacingDropdown letterSpacingList={realList} {...props} />
    ),
  };
}
