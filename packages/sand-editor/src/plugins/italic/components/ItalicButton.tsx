import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { HOTKEYS, MARKS } from '../../../constants';
import { getHotkeyDesc, hasMark } from '../../../utils';

const { ITALIC } = MARKS;
const tip = `斜体 ${getHotkeyDesc(HOTKEYS[ITALIC])}`;

type ItalicButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class ItalicButton extends React.Component<ItalicButtonProps, {}> {
  onClick = (e) => {
    e && e.preventDefault();
    const { onClick, editor } = this.props;
    const change = editor.toggleItalicMark();
    onClick && onClick(ITALIC, change);
  };

  isDisabled = () => {
    return !this.props.editor;
  };

  render() {
    const { onClick, editor, ...restProps } = this.props;
    const isActive = hasMark(editor, ITALIC);
    return (
      <Button
        disabled={this.isDisabled()}
        active={isActive}
        tip={tip}
        iconType="italic"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default ItalicButton;
