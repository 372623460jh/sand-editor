import * as React from 'react';
import cx from 'classnames';
import BackColorIcon from './BackColorIcon';
import ForeColorIcon from './ForeColorIcon';
import './Icon.less';

const FORE_COLOR_TYPE = 'fore-color';
const BACK_COLOR_TYPE = 'back-color';

type IconProps = {
  clsPrefix?: string;
  className?: string;
  type: string;
  fill?: string;
  stroke?: string;
};

class Icon extends React.Component<IconProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-icon',
  };

  render() {
    const {
      clsPrefix,
      type,
      className,
      fill,
      stroke,
      ...restProps
    } = this.props;

    const svg = [FORE_COLOR_TYPE, BACK_COLOR_TYPE].indexOf(type) > -1;
    const classNames = cx(clsPrefix, `${clsPrefix}-${type}`, className, {
      [`${clsPrefix}-svg`]: svg,
    });
    let SVGIcon;

    if (type === FORE_COLOR_TYPE) {
      SVGIcon = ForeColorIcon;
    }

    if (type === BACK_COLOR_TYPE) {
      SVGIcon = BackColorIcon;
    }

    return svg ? (
      <span className={classNames} {...restProps}>
        <SVGIcon fill={fill} stroke={stroke} />
      </span>
    ) : (
      <span className={classNames} {...restProps} />
    );
  }
}

export default Icon;
