import * as React from 'react';
import { EmojiPicker } from '@jianghe/sand-editor-ui';

type EmoticonButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  emoticonList: any[];
  columnsNum?: number;
};

class EmoticonButton extends React.Component<EmoticonButtonProps, {}> {
  /**
   * 选中表情
   */
  onChange = (emoticon) => {
    const { editor } = this.props;
    editor.insertEmoticon(emoticon).focus();
  };

  render() {
    const { emoticonList = [], columnsNum = 12 } = this.props;

    return (
      <EmojiPicker
        disabled={false}
        emojis={emoticonList}
        columnsNum={columnsNum}
        tip="表情"
        iconType="emoji"
        onChange={this.onChange}
      />
    );
  }
}

export default EmoticonButton;
