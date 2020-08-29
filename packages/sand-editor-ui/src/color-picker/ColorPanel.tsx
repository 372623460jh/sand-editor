import * as React from 'react';
import cx from 'classnames';
import tinyColor from 'tinycolor2';
import { Tooltip, Input, Button, message } from 'antd';
import { DEFAULT_COLORS } from './config';
import './ColorPanel.less';

type ColorPanelProps = {
  clsPrefix?: string;
  className?: string;
  colors?: any[];
  value?: string;
  onChange?: (...args: any[]) => any;
  enableLocalStorage: boolean;
  cachedColorsKey: string;
};

class ColorPanel extends React.PureComponent<ColorPanelProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-color-panel',
    colors: DEFAULT_COLORS,
    onChange: () => {},
    enableLocalStorage: !!window.localStorage,
    cachedColorsKey: 'sand-color-cached',
  };

  state = {
    inputColor: null,
  };

  // 获取缓存色值列表
  getCachedColors = () => {
    const { enableLocalStorage, cachedColorsKey } = this.props;
    if (!enableLocalStorage) {
      return [];
    }
    const data = window.localStorage.getItem(cachedColorsKey);
    let colors = [];
    if (data) {
      try {
        colors = JSON.parse(data);
      } catch (err) {
        // foo
      }
    }
    return colors;
  };

  // 将色值存储到缓存中
  putCachedColor = (color: string) => {
    if (!color) {
      return;
    }
    const { cachedColorsKey } = this.props;
    const colors = this.getCachedColors();
    const index = colors.indexOf(color);
    if (index === 0) {
      return;
    }
    // 删除重复的色值
    if (index !== -1) {
      colors.splice(index, 1);
    }
    colors.unshift(color); // 最近使用的颜色放在首位
    colors.splice(9); // 最多保留 9 个色值
    window.localStorage.setItem(cachedColorsKey, JSON.stringify(colors));
  };

  getContrastingColor = (color) => {
    if (!color) {
      return '#FFFFFF';
    }
    const tc = tinyColor(color);

    if (!tc.isValid()) {
      return '#FFFFFF';
    }

    const rgb = tc.toRgb();
    const hex = tc.toHexString(null);
    // https://gist.github.com/dcondrey/183971f17808e9277572
    const cColor =
      (299 * rgb.r + 587 * rgb.g + 114 * rgb.b) / 1000 < 210
        ? '#FFFFFF'
        : '#8C8C8C';
    return hex === 'transparent' ? 'rgba(0,0,0,0.4)' : cColor;
  };

  onChange = (color) => {
    this.props.onChange(color);
    this.putCachedColor(color);
  };

  // 提交自定义输入色值
  onBtnInputColor = () => {
    const { inputColor } = this.state;
    if (!inputColor || !/^#([a-z0-9]{3}|[a-z0-9]{6})$/i.test(inputColor)) {
      message.error({
        content: '请输入正确的16进制色值',
      });
      return;
    }
    this.onChange(inputColor);
  };

  // 自定义输入色值
  onInputColorChange = (e) => {
    const color = e.target.value;
    this.setState({
      inputColor: color,
    });
  };

  renderCheckIcon({ color, checked }) {
    const style = {
      display: checked ? 'block' : 'none',
      fill: this.getContrastingColor(color),
    };

    return (
      <svg viewBox="0 0 18 18" style={style}>
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
      </svg>
    );
  }

  renderItems() {
    const { clsPrefix, colors, value, enableLocalStorage } = this.props;
    const groupClassName = `${clsPrefix}-group`;
    const itemClassName = `${clsPrefix}-item`;
    const innerClassName = `${itemClassName}-inner`;
    const cachedColors = this.getCachedColors();
    return [
      <React.Fragment key="color-panel">
        <div className={cx(`${clsPrefix}-cached`)}>
          <span>最近使用颜色</span>
        </div>

        <div className={`${clsPrefix}-btn-clean`}>
          <button
            type="button"
            className={itemClassName}
            onClick={() => this.onChange(null)}
          >
            <svg width="18px" height="18px" viewBox="0 0 18 18">
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(1.000000, 1.000000)">
                  <line
                    x1="15"
                    y1="1"
                    x2="1"
                    y2="15"
                    stroke="#EE4C4B"
                    strokeLinecap="square"
                  />
                  <rect
                    stroke="#EEEEEE"
                    x="0"
                    y="0"
                    width="16"
                    height="16"
                    rx="2"
                  />
                </g>
              </g>
            </svg>
          </button>
          {enableLocalStorage
            ? cachedColors.map((color, i) => {
                return (
                  <Tooltip
                    key={`cache-tooltip-${i}`}
                    placement="bottom"
                    title={color}
                  >
                    <button
                      type="button"
                      className={cx(itemClassName)}
                      onClick={() => this.onChange(color)}
                    >
                      <span
                        className={innerClassName}
                        style={{ backgroundColor: color }}
                      >
                        {this.renderCheckIcon({ color, checked: false })}
                      </span>
                    </button>
                  </Tooltip>
                );
              })
            : null}
        </div>
      </React.Fragment>,
      colors.map((group, index) => {
        return (
          <div className={groupClassName} key={index}>
            {group.map((color, i) => {
              const checked = value === color;
              const classNames = cx(itemClassName, {
                [`${itemClassName}-checked`]: checked,
              });
              return (
                <Tooltip
                  key={`normal-tooltip-${i}`}
                  placement="bottom"
                  title={color}
                >
                  <button
                    type="button"
                    className={classNames}
                    onClick={() => this.onChange(color)}
                  >
                    <span
                      className={innerClassName}
                      style={{ backgroundColor: color }}
                    >
                      {this.renderCheckIcon({ color, checked })}
                    </span>
                  </button>
                </Tooltip>
              );
            })}
          </div>
        );
      }),
    ];
  }

  render() {
    const { clsPrefix, className } = this.props;
    const { inputColor } = this.state;
    return (
      <div className={cx(className, clsPrefix)}>
        {this.renderItems()}
        <div className={`${clsPrefix}-color-input`}>
          <div
            className={`${clsPrefix}-color-input-tip`}
            style={{ backgroundColor: inputColor }}
          />
          <Input onChange={this.onInputColorChange} placeholder="#FFFFFF" />
          <Button onClick={this.onBtnInputColor}>确定</Button>
        </div>
      </div>
    );
  }
}

export default ColorPanel;
