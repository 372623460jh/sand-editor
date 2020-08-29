import * as React from 'react';
import EmoticonButton from '../components/EmoticonButton';
import { defaultColumnsNum, defaultEmojiList } from '../config';

export default function toolbar(options) {
  // 处理emoji List和行数
  const {
    emoticonList = defaultEmojiList,
    columnsNum = defaultColumnsNum,
  } = options;

  return {
    button: (props) => (
      <EmoticonButton
        {...props}
        emoticonList={emoticonList}
        columnsNum={columnsNum}
      />
    ),
  };
}
