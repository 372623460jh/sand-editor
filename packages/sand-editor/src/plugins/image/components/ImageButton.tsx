import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';

type ImageButtonProps = {
  onClick?: (...args: any[]) => any;
  onBtnClick?: (...args: any[]) => any;
  editor?: any;
  options?: any;
  tip?: React.ReactNode;
};

class ImageButton extends React.Component<ImageButtonProps, {}> {
  static defaultProps = {
    tip: '插入图片',
  };

  onClick = (event) => {
    // eslint-disable-next-line
    const { onClick, editor, onBtnClick, options } = this.props;
    if (onBtnClick) {
      return onBtnClick(event, editor);
    }
    return onClick(options.type, editor);
  };

  isDisabled = () => {
    const { editor } = this.props;
    if (!editor) {
      return true;
    }
    return editor.isSelectionInImage();
  };

  render() {
    const {
      onClick,
      editor,
      onBtnClick,
      tip,
      options,
      ...restProps
    } = this.props;

    return (
      <Button
        tip={tip}
        disabled={this.isDisabled()}
        iconType="image"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default ImageButton;
