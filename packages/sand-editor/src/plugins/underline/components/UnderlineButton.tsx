import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { MARKS, HOTKEYS } from '../../../constants';
import { getHotkeyDesc, hasMark } from '../../../utils';

const { UNDERLINE } = MARKS;
const tip = `下划线 ${getHotkeyDesc(HOTKEYS[UNDERLINE])}`;

type UnderlineButtonProps = {
  onClick: (...args: any[]) => any;
  editor?: any;
};

class UnderlineButton extends React.Component<UnderlineButtonProps, {}> {
  static defaultProps = {
    editor: null,
  };

  onClick = (e) => {
    e && e.preventDefault();
    const { onClick, editor } = this.props;
    const change = editor.toggleUnderlineMark();
    onClick(UNDERLINE, change);
  };

  isDisabled = () => {
    const { editor } = this.props;
    return !editor;
  };

  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onClick, editor, ...restProps } = this.props;
    const isActive = hasMark(editor, UNDERLINE);
    return (
      <Button
        disabled={this.isDisabled()}
        tip={tip}
        active={isActive}
        iconType="underline"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default UnderlineButton;
