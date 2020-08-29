import * as React from 'react';
import cx from 'classnames';
import AntDTooltip from 'antd/es/tooltip';
import 'antd/es/tooltip/style/css';
import './Tooltip.less';

type TooltipProps = {
  overlayClassName?: string;
  [key: string]: any;
};

const Tooltip = (props: TooltipProps) => {
  const { overlayClassName, ...restProps } = props;
  const classNames = cx(overlayClassName, 'sand-tooltip');

  // @ts-ignore
  return <AntDTooltip overlayClassName={classNames} {...restProps} />;
};

export default Tooltip;
