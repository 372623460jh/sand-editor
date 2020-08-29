import * as React from 'react';
import { ColorPicker } from '@jianghe/sand-editor-ui';
import { MARKS, COMMANDS } from '../../../constants';

const { BACK_COLOR } = MARKS;
const { BACK_COLOR: COMMAND } = COMMANDS;
const tip = '背景颜色';

type BackColorButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  defaultValue?: string;
  colors?: any[];
};

type BackColorButtonState = {
  color: any;
};

class BackColorButton extends React.Component<
  BackColorButtonProps,
  BackColorButtonState
> {
  static defaultProps = {
    defaultValue: '#fff8bd',
  };

  constructor(props) {
    super(props);
    this.state = {
      color: props.defaultValue,
    };
  }

  onClick = () => {
    const { onClick, editor } = this.props;
    const { color } = this.state;
    const { value } = editor;
    const { selection } = value;
    // 以后有 table 组件可能有多个 range
    const ranges = [selection];
    const change = editor[COMMAND]({ color, ranges });
    onClick(BACK_COLOR, change);
  };

  onChange = (color) => {
    const { defaultValue } = this.props;
    this.setState(
      {
        color: color || defaultValue,
      },
      () => {
        this.onClick();
      }
    );
  };

  isDisabled = () => {
    const { editor } = this.props;
    return !editor;
  };

  render() {
    const { onClick, editor, defaultValue, ...restProps } = this.props;
    const { color } = this.state;
    return (
      <ColorPicker
        type="back-color"
        value={color}
        tip={tip}
        disabled={this.isDisabled()}
        onChange={this.onChange}
        onBtnClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default BackColorButton;
