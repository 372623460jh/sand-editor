import * as React from 'react';
import { ColorPicker } from '@jianghe/sand-editor-ui';
import { MARKS, COMMANDS } from '../../../constants';

const { FORE_COLOR } = MARKS;
const { FORE_COLOR: FORE_COLOR_COMMAND } = COMMANDS;
const tip = '文字颜色';

type ForeColorButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  defaultValue?: string;
  colors?: any[];
};

type ForeColorButtonState = {
  color: any;
};

class ForeColorButton extends React.Component<
  ForeColorButtonProps,
  ForeColorButtonState
> {
  static defaultProps = {
    defaultValue: '#CF1322',
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
    const change = editor[FORE_COLOR_COMMAND]({ color, ranges });
    onClick(FORE_COLOR, change);
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
        value={color}
        onChange={this.onChange}
        type="fore-color"
        onBtnClick={this.onClick}
        tip={tip}
        disabled={this.isDisabled()}
        {...restProps}
      />
    );
  }
}

export default ForeColorButton;
