/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import cx from 'classnames';
import { DEFAULT_COLORS } from './config';
import Dropdown from '../dropdown';
import ColorPanel from './ColorPanel';
import './ColorPicker.less';

type ColorPickerProps = {
  className?: string;
  clsPrefix?: string;
  colors?: any[];
  value?: string;
  onChange?: (...args: any[]) => any;
  onBtnClick?: (...args: any[]) => any;
  type?: string;
  dropdownTip?: React.ReactNode;
  tip?: React.ReactNode;
  disabled?: boolean;
  dropDown?: any;
};

class ColorPicker extends React.PureComponent<ColorPickerProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-color-picker',
    colors: DEFAULT_COLORS,
    onChange: () => {},
    dropdownTip: '更多颜色',
    value: '#CF1322',
  };

  state = {
    visible: false,
  };

  onChange = (color) => {
    this.props.onChange(color);
    this.dropDown.hideDropdown();
  };

  // 子组件引用
  dropDown = null;

  onRef = (ref) => {
    this.dropDown = ref;
  };

  render() {
    const { visible } = this.state;
    const {
      clsPrefix,
      className,
      type,
      tip,
      dropdownTip,
      colors,
      value,
      onBtnClick,
      disabled,
    } = this.props;
    const classNames = cx(className, clsPrefix, `${clsPrefix}-${type}`);
    const panel = (
      <ColorPanel onChange={this.onChange} colors={colors} value={value} />
    );
    const iconProps = {
      stroke: value,
      fill: value,
    };

    // TODO: 这里的 content 设计会导致 content 的 onchange 事件无法抛给 Dropdown
    return (
      <Dropdown
        disabled={disabled}
        onClick={onBtnClick}
        className={classNames}
        iconType={type}
        iconProps={iconProps}
        content={panel}
        tip={tip}
        dropdownTip={dropdownTip}
        group
        onChange={this.onChange}
        onRef={this.onRef}
      />
    );
  }
}

export default ColorPicker;
