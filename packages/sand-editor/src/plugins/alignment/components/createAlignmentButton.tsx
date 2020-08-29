import * as React from 'react';
import ToolbarButton from '../../../components/ToolbarButton';
import setAlignment from '../commands/setAlignment';
import isDisabled from '../utils/isDisabled';

/**
 * 按钮hover提示
 */
const tips = {
  left: '左对齐',
  center: '居中对齐',
  right: '右对齐',
  justify: '两端对齐',
};

type AlignmentButtonProps = {
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  editor?: any;
};

export default function createAlignmentButton(type) {
  return class AlignmentButton extends React.Component<AlignmentButtonProps> {
    static defaultProps = {
      editor: null,
    };

    handleClick = () => {
      const { editor } = this.props;

      if (!editor) return false;
      setAlignment(editor, type);
    };

    isActive = () => {
      const { editor } = this.props;

      if (!editor) return false;

      const { value } = editor;
      const { selection, document } = value;
      // 是否是p标签
      const paragraph = document.getClosest(selection.start.key, (node) => {
        return node.type === 'paragraph';
      });
      const alignment = paragraph ? paragraph.data.get('align') || '' : '';
      return alignment === type;
    };

    render() {
      const { onClick, editor, ...restProps } = this.props;

      return (
        <ToolbarButton
          iconType={`align-${type}`}
          tip={tips[type] || ''}
          active={this.isActive()}
          disabled={isDisabled(editor)}
          onClick={this.handleClick}
          {...restProps}
        />
      );
    }
  };
}
