import * as React from 'react';
import cx from 'classnames';
import Button from '../button';
import Icon from '../icon';
import DropdownList from './DropdownList';
import './Dropdown.less';
import { getFieldByKey, contains } from './utils';

const DISPLAY_TYPES = {
  TEXT: 'TEXT',
  ICON: 'ICON',
  NO_CHANGE: 'NO_CHANGE',
};

type DropdownProps = {
  clsPrefix?: string;
  className?: string;
  group?: boolean;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
  content?: React.ReactNode;
  iconType?: string;
  iconProps?: { [key: string]: any };
  tip?: React.ReactNode;
  dropdownTip?: React.ReactNode;
  dropdownClassName?: string;
  list?: any[];
  value?: React.ReactNode;
  onChange?: (...args: any[]) => any;
  displayType?: any;
  onRef?: Function;
};

type DropdownState = {
  active: boolean;
};

class Dropdown extends React.Component<DropdownProps, DropdownState> {
  static defaultProps = {
    clsPrefix: 'sand-dropdown',
    group: false,
    displayType: DISPLAY_TYPES.TEXT,
  };

  state = {
    active: false,
  };

  // 当前 DOM 节点
  node = null;

  componentDidMount = () => {
    this.props.onRef && this.props.onRef(this);
    // TODO: dropdown 比较适合直接使用 antd 现成的
    window.document.addEventListener('click', this.onDocumentClickListener);
  };

  componentWillUnmount = () => {
    window.document.removeEventListener('click', this.onDocumentClickListener);
  };

  onDocumentClickListener = (e) => {
    // 如果当前点击的对象不是 dropdown 的子 dom, 表示点击行为发生在外部，则隐藏 dropdown
    if (!contains(this.node, e.target)) {
      this.hideDropdown();
    }
  };

  toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { active } = this.state;
    if (active) {
      this.hideDropdown();
    } else {
      this.showDropdown();
    }
  };

  showDropdown = () => {
    this.setState({
      active: true,
    });
  };

  hideDropdown = () => {
    this.setState({
      active: false,
    });
  };

  renderSelectedValue() {
    const { list, value, displayType } = this.props;
    if (!list || !value) {
      return null;
    }

    // 不变化
    if (displayType === DISPLAY_TYPES.NO_CHANGE) {
      return null;
    }

    const isIcon = displayType === DISPLAY_TYPES.ICON;
    const selectedVal = isIcon
      ? getFieldByKey({ list, field: 'icon', key: value })
      : getFieldByKey({ list, key: value });

    return isIcon ? <Icon type={selectedVal} /> : selectedVal;
  }

  render() {
    const { active } = this.state;
    const {
      clsPrefix,
      className,
      group,
      onClick,
      children,
      content,
      tip,
      disabled,
      dropdownTip,
      dropdownClassName,
      list,
      value,
      onChange,
      displayType,
      iconType,
      iconProps,
      ...restProps
    } = this.props;
    const classNames = cx(clsPrefix, className, {
      [`${clsPrefix}-group`]: group,
      [`${clsPrefix}-single`]: !group,
      [`${clsPrefix}-active`]: active,
    });
    const triggerClassName = `${clsPrefix}-trigger`;
    const triggerClassNames = cx(triggerClassName, {
      [`${triggerClassName}-group`]: group,
    });
    const contentClassNames = cx(`${clsPrefix}-content`, dropdownClassName, {
      [`${clsPrefix}-content-active`]: active,
    });
    const downArrowClassName = cx(`${clsPrefix}-caret`);
    const downArrow = <span className={downArrowClassName} />;
    const triggerBtnClassName = `${clsPrefix}-trigger-btn`;
    const triggerDownClassName = `${clsPrefix}-trigger-down`;
    const triggerTextClassName = `${clsPrefix}-trigger-text`;
    const childrenNode = (
      <span className={triggerTextClassName}>
        {this.renderSelectedValue()}
        {children}
        &#8203;
      </span>
    );
    const dropdownContent = list ? (
      <DropdownList
        onChange={onChange}
        active={active}
        dataSource={list}
        value={value}
      />
    ) : (
      content
    );
    const singleNode = (
      <Button
        iconType={iconType}
        iconProps={iconProps}
        tip={tip}
        disabled={disabled}
        active={active}
        className={triggerBtnClassName}
        onClick={this.toggleDropdown}
      >
        {childrenNode}
        {downArrow}
      </Button>
    );
    const groupNode = (
      <>
        <Button
          iconProps={iconProps}
          iconType={iconType}
          disabled={disabled}
          tip={tip}
          className={triggerBtnClassName}
          onClick={onClick}
        >
          {childrenNode}
        </Button>
        <Button
          disabled={disabled}
          tip={dropdownTip}
          className={triggerDownClassName}
          onClick={this.toggleDropdown}
        >
          &nbsp;{downArrow}
        </Button>
      </>
    );
    return (
      <div
        ref={(node) => {
          this.node = node;
        }}
        className={classNames}
        {...restProps}
      >
        <div className={triggerClassNames}>
          {group ? groupNode : singleNode}
        </div>
        <div className={contentClassNames}>{dropdownContent}</div>
      </div>
    );
  }
}

export default Dropdown;
