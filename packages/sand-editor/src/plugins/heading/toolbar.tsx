import * as React from 'react';
import HeadingButton from './components/HeadingButton';
import HeadingDropdown from './components/HeadingDropdown';

import { BLOCKS } from '../../constants';

const {
  PARAGRAPH,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
} = BLOCKS;

const HEADING_LIST = [
  {
    key: HEADING_1,
    label: '标题 1',
  },
  {
    key: HEADING_2,
    label: '标题 2',
  },
  {
    key: HEADING_3,
    label: '标题 3',
  },
  {
    key: HEADING_4,
    label: '标题 4',
  },
  {
    key: HEADING_5,
    label: '标题 5',
  },
  {
    key: HEADING_6,
    label: '标题 6',
  },
];

// eslint-disable-next-line no-unused-vars
export default function toolbar(options = {}) {
  // @ts-ignore
  const { enabledHeadings } = options;
  const headings = HEADING_LIST.filter(
    (item) => enabledHeadings.indexOf(item.key) > -1
  );

  const headingList = [
    {
      key: PARAGRAPH,
      label: '正文',
    },
    ...headings,
  ];

  const btnList = {};

  enabledHeadings.forEach((heading) => {
    btnList[heading] = (props) => <HeadingButton type={heading} {...props} />;
  });

  return {
    button: (props) => <HeadingDropdown headingList={headingList} {...props} />,
    // h1、h2 独立按钮
    ...btnList,
  };
}
