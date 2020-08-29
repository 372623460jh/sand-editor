import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { hasMark } from '../../../utils';

type SupButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  disabled?: boolean;
  markType?: string;
  tip?: React.ReactNode;
};

class SupButton extends React.Component<SupButtonProps, {}> {
  onClick = (e) => {
    e && e.preventDefault();
    const { onClick, editor, markType } = this.props;
    const change = editor.toggleSupMark();
    onClick && onClick(markType, change);
  };

  isDisabled = () => {
    const { disabled, editor } = this.props;
    return disabled || !editor;
  };

  render() {
    const {
      onClick,
      editor,
      disabled,
      markType,
      tip,
      ...restProps
    } = this.props;
    const isActive = hasMark(editor, markType);

    return (
      // @ts-ignore
      <Button
        disabled={this.isDisabled()}
        {...restProps}
        active={isActive}
        tip={tip}
        iconType="sup"
        // 使用 onMouseDown 可以避免点击以后编辑区失去焦点
        onMouseDown={this.onClick}
      />
    );
  }
}

export default SupButton;
