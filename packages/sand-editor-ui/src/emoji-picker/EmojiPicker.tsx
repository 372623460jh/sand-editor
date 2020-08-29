import * as React from 'react';
import cx from 'classnames';
import Dropdown from '../dropdown';
import EmojiPanel from './EmojiPanel';
import './EmojiPicker.less';

type EmojiPickerProps = {
  className?: string;
  clsPrefix?: string;
  // 表情列表
  emojis?: any[];
  // 是否可用
  disabled?: boolean;
  // 选中表情后回调
  onChange?: (...args: any[]) => any;
  // 提示
  tip?: React.ReactNode;
  // icon
  iconType?: string;
  // 列数
  columnsNum?: number;
};

class EmojiPicker extends React.PureComponent<EmojiPickerProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-emoji-picker',
    emojis: [],
    onChoose: () => {},
  };

  onChange = (emoticon) => {
    const { onChange } = this.props;
    onChange(emoticon);
    this.dropDown.hideDropdown();
  };

  // 子组件引用
  dropDown = null;

  onRef = (ref) => {
    this.dropDown = ref;
  };

  render() {
    const {
      clsPrefix,
      className,
      iconType,
      tip,
      emojis,
      disabled,
      columnsNum,
    } = this.props;
    const classNames = cx(className, clsPrefix);

    const panel = (
      <EmojiPanel
        onChange={this.onChange}
        emojis={emojis}
        columnsNum={columnsNum}
      />
    );

    return (
      <Dropdown
        disabled={disabled}
        className={classNames}
        displayType="NO_CHANGE"
        iconType={iconType}
        content={panel}
        tip={tip}
        onRef={this.onRef}
      />
    );
  }
}

export default EmojiPicker;
