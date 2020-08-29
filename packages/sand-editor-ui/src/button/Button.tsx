import * as React from 'react';
import cx from 'classnames';
import Tooltip from '../tooltip';
import Icon from '../icon';
import './Button.less';

function isFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object Function]';
}

type ButtonProps = {
  clsPrefix?: string;
  className?: string;
  active?: boolean;
  disabled?: boolean;
  tip?: React.ReactNode;
  placement?: string;
  iconType?: string;
  iconProps?: { [key: string]: any };
  onClick?: (...args: any[]) => any;
  [key: string]: any;
};

type ButtonState = {
  tipsVisible: boolean;
};

class Button extends React.Component<ButtonProps, ButtonState> {
  static defaultProps = {
    clsPrefix: 'sand-toolbar-btn',
    iconProps: {},
    placement: 'bottom',
  };

  state: ButtonState = {
    tipsVisible: false,
  };

  // 用来决定是否显示tips
  resolveVisible = (type, e) => {
    this.setState({
      tipsVisible: !(type === 'onClick' || type === 'onMouseLeave'),
    });

    isFunction(this.props[type]) && this.props[type](e);
  };

  render() {
    const {
      clsPrefix,
      active,
      disabled,
      iconType,
      iconProps,
      tip,
      className,
      placement,
      children,
      ...restProps
    } = this.props;

    const { tipsVisible } = this.state;
    const classNames = cx(clsPrefix, className, {
      [`${clsPrefix}-active`]: active,
      [`${clsPrefix}-disabled`]: disabled,
    });

    const btnNode = (
      <button
        type="button"
        className={classNames}
        {...restProps}
        onClick={(e) => {
          this.resolveVisible('onClick', e);
        }}
        onMouseEnter={(e) => {
          this.resolveVisible('onMouseEnter', e);
        }}
        onMouseLeave={(e) => {
          this.resolveVisible('onMouseLeave', e);
        }}
      >
        {iconType ? <Icon type={iconType} {...iconProps} /> : null}
        {children}
      </button>
    );

    return tip ? (
      <Tooltip
        overlayClassName={`${clsPrefix}-tooltip`}
        placement={placement}
        title={tip}
        visible={tipsVisible}
        overlayStyle={{ fontSize: 12 }}
      >
        {btnNode}
      </Tooltip>
    ) : (
      btnNode
    );
  }
}

export default Button;
