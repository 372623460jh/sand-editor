import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { MARKS, HOTKEYS } from '../../../constants';
import { getHotkeyDesc, hasMark } from '../../../utils';

const { STRIKETHROUGH } = MARKS;
const tip = `删除线 ${getHotkeyDesc(HOTKEYS[STRIKETHROUGH])}`;

type StrikethroughButtonProps = {
  onClick: (...args: any[]) => any;
  editor?: any;
};

class StrikethroughButton extends React.Component<
  StrikethroughButtonProps,
  {}
> {
  static defaultProps = {
    editor: null,
  };

  onClick = (e) => {
    e && e.preventDefault();
    const { onClick, editor } = this.props;
    const change = editor.toggleStrikeMark();
    onClick && onClick(STRIKETHROUGH, change);
  };

  isDisabled = () => {
    const { editor } = this.props;
    return !editor;
  };

  render() {
    const { onClick, editor, ...restProps } = this.props;
    const isActive = hasMark(editor, STRIKETHROUGH);
    return (
      <Button
        disabled={this.isDisabled()}
        tip={tip}
        active={isActive}
        iconType="strikethrough"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default StrikethroughButton;
