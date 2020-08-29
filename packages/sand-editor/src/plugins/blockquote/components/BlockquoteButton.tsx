import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { BLOCKS, COMMANDS } from '../../../constants';
import { isSelectionInBlockquote } from '../utils';

const { BLOCKQUOTE } = BLOCKS;
const { WRAP_IN_BLOCKQUOTE, UNWRAP_BLOCKQUOTE } = COMMANDS;
const tip = '插入引用';

type BlockquoteButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class BlockquoteButton extends React.Component<BlockquoteButtonProps, {}> {
  onClick = () => {
    const { onClick, editor } = this.props;
    const command = this.isInBlockquote()
      ? UNWRAP_BLOCKQUOTE
      : WRAP_IN_BLOCKQUOTE;
    const change = editor[command]();
    onClick(BLOCKQUOTE, change);
  };

  isDisabled = () => {
    const { editor } = this.props;
    return !editor;
  };

  isInBlockquote = () => {
    const { editor } = this.props;
    if (!editor) {
      return false;
    }
    return isSelectionInBlockquote(editor.value);
  };

  render() {
    const { onClick, editor, ...restProps } = this.props;

    return (
      <Button
        active={this.isInBlockquote()}
        tip={tip}
        disabled={this.isDisabled()}
        iconType="quote"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default BlockquoteButton;
