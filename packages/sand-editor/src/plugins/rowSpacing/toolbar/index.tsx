import * as React from 'react';
import RowSpacingDropdown from '../components/RowSpacingDropdown';

export default function toolbar(options) {
  const { rowSpacingList = [] } = options;
  const realList = [];
  // 处理段前距入参
  rowSpacingList.forEach((rsSize) => {
    realList.push({
      key: `row_spacing_${rsSize}em`,
      label: `${rsSize}`,
    });
  });

  return {
    button: (props) => <RowSpacingDropdown rsList={realList} {...props} />,
  };
}
