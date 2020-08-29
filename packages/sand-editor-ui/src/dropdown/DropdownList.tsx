import * as React from 'react';
import cx from 'classnames';
import Icon from '../icon';
import Tooltip from '../tooltip';
import './DropdownList.less';

type DropdownListProps = {
  clsPrefix?: string;
  className?: string;
  dataSource?: any[];
  value?: React.ReactNode;
  active?: boolean;
  onChange?: (...args: any[]) => any;
};

class DropdownList extends React.Component<DropdownListProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-dropdown-list',
    dataSource: [],
    onChange: () => {},
  };

  onChange = (val) => {
    this.props.onChange(val);
  };

  render() {
    const {
      clsPrefix,
      className,
      dataSource,
      value,
      active,
      ...restProps
    } = this.props;
    const classNames = cx(clsPrefix, className);
    const itemClassName = `${clsPrefix}-item`;
    const itemIconClassName = `${itemClassName}-icon`;

    return (
      <ul className={classNames} {...restProps}>
        {dataSource.map((item) => {
          const { key, label, icon, tip } = item;
          const checked = key === value;
          const iconNoe = icon ? (
            <Icon className={itemIconClassName} type={icon} />
          ) : null;
          const clsNames = cx(itemClassName, `${itemClassName}-${key}`, {
            [`${itemClassName}-checked`]: checked,
          });
          const linkNode = (
            <a
              href="javascript: void 0"
              onClick={(e) => {
                e.preventDefault();
                this.onChange(key);
              }}
            >
              {iconNoe}
              {label}
            </a>
          );
          const withTip =
            tip && active ? (
              <Tooltip placement="right" title={tip}>
                {linkNode}
              </Tooltip>
            ) : (
              linkNode
            );
          return (
            <li key={key} className={clsNames}>
              {withTip}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default DropdownList;
