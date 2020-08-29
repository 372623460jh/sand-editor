import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { HOTKEYS, COMMANDS } from '../../../constants';
import { getHotkeyDesc } from '../../../utils';

const { REDO } = COMMANDS;
const tip = `重做 ${getHotkeyDesc(HOTKEYS[REDO])}`;

type RedoProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class Redo extends React.Component<RedoProps, {}> {
  onClick = (event) => {
    const { editor } = this.props;
    if (!editor) return;
    event.preventDefault();
    editor.redo();
  };

  isDisabled = () => {
    const { editor } = this.props;
    if (!editor) return true;
    const { value } = editor;
    const { data } = value;
    // 是否有可redo的历史
    const redoStack = data.get('redos');
    return !redoStack || !redoStack.size;
  };

  render() {
    const { onClick, ...restProps } = this.props;

    return (
      <Button
        iconType="redo"
        tip={tip}
        disabled={this.isDisabled()}
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default Redo;
