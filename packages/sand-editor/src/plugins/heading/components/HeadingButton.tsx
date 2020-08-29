import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { BLOCKS, COMMANDS } from '../../../constants';
import { getClosestParagraph, isSelectionInHeading } from '../utils';
import './HeadingButton.less';

const { PARAGRAPH } = BLOCKS;
const { SET_HEADING } = COMMANDS;

type HeadingButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  type?: string;
};

class HeadingButton extends React.Component<HeadingButtonProps, {}> {
  onClick = () => {
    const { onClick, editor, type } = this.props;
    const nextType = isSelectionInHeading(editor.value, type)
      ? PARAGRAPH
      : type;
    const change = editor[SET_HEADING]({ type: nextType });
    onClick(type, change);
  };

  isDisabled = () => {
    const { editor } = this.props;
    return !editor;
  };

  getBlockType = () => {
    const { editor } = this.props;

    if (!editor) {
      return PARAGRAPH;
    }

    const block = getClosestParagraph(editor.value);
    return block ? block.type : PARAGRAPH;
  };

  render() {
    const { onClick, editor, type, ...restProps } = this.props;
    const level = type.split('-')[1];
    const iconType = `h${level}`;
    const tip = `标题 ${level}`;

    return (
      <Button
        className={`se-toolbar-btn-heading}-${type}`}
        iconType={iconType}
        tip={tip}
        active={this.getBlockType() === type}
        disabled={this.isDisabled()}
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default HeadingButton;
