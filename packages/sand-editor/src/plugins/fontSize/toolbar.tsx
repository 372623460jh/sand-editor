import * as React from 'react';
import { setDefaultFontSize } from './config';

import FontSizeDropdown from './components/FontSizeDropdown';

export default function toolbar(options = {}) {
  // @ts-ignore
  const { fontSizeList = [], defaultFontSize = '17px' } = options;
  // 设置默认字体
  setDefaultFontSize(defaultFontSize);
  const realList = [];
  fontSizeList.forEach((fontSize) => {
    realList.push({
      key: `font_size_${fontSize}px`,
      label: `${fontSize}`,
    });
  });

  return {
    button: (props) => <FontSizeDropdown fontSizeList={realList} {...props} />,
  };
}
