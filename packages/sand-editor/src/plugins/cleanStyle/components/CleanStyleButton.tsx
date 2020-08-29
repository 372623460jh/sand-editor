import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';

type CleanStyleButtonProps = {
  onClick: (...args: any[]) => any;
  editor?: any;
};

class CleanStyleButton extends React.Component<CleanStyleButtonProps, {}> {
  static defaultProps = {
    editor: null,
  };

  onClick = () => {
    const { editor } = this.props;
    editor.clearStyles().focus();
  };

  /**
   * 清除格式是否可用
   */
  isDisabled = () => {
    const { editor } = this.props;
    if (!editor) return true;
    const { value } = editor;
    const { selection, document } = value;
    // 判断选区中是否有mark
    const marks = document.getMarksAtRange(selection);
    return marks.isEmpty();
  };

  render() {
    const { onClick, ...restProps } = this.props;
    return (
      <Button
        disabled={this.isDisabled()}
        tip="清除格式"
        active={false}
        iconType="clean"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default CleanStyleButton;
