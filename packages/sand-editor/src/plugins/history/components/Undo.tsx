import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { HOTKEYS, COMMANDS } from '../../../constants';
import { getHotkeyDesc } from '../../../utils';

const { UNDO } = COMMANDS;
const tip = `撤销 ${getHotkeyDesc(HOTKEYS[UNDO])}`;

type UndoProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class Undo extends React.Component<UndoProps, {}> {
  onClick = (event) => {
    const { editor } = this.props;
    if (!editor) return;
    event.preventDefault();
    editor.undo();
  };

  isDisabled = () => {
    const { editor } = this.props;
    if (!editor) return true;
    const { value } = editor;
    const { data } = value;
    // 是否有可undo的历史
    const undoStack = data.get('undos');
    return !undoStack || !undoStack.size;
  };

  render() {
    const { onClick, ...restProps } = this.props;

    return (
      <Button
        iconType="undo"
        tip={tip}
        disabled={this.isDisabled()}
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default Undo;
