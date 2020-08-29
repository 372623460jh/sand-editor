import * as React from 'react';
import cx from 'classnames';
import './Toolbar.less';

type ToolbarProps = {
  className?: string;
  clsPrefix?: string;
  plugins?: any;
  editor?: any;
  toolbar?: any[];
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
};

class Toolbar extends React.Component<ToolbarProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-toolbar',
    plugins: {},
    toolbar: [],
  };

  // 工具栏分块
  renderGroup = (group, index) => {
    const { clsPrefix } = this.props;
    const className = `${clsPrefix}-group`;
    // 分组的工具栏
    // [['bold', 'italic'], ['link', 'image']];
    if (Array.isArray(group)) {
      return (
        <div className={className} key={index}>
          {group.map(this.renderItem)}
        </div>
      );
    }
    return this.renderItem(group, index);
  };

  renderItem = (toolbarItem, index) => {
    const { clsPrefix } = this.props;
    const className = `${clsPrefix}-item`;

    // 直接传入 React Element
    if (React.isValidElement(toolbarItem)) {
      return React.cloneElement(toolbarItem, {
        key: index,
        className,
        // @ts-ignore
        ...toolbarItem.props,
      });
    }

    const { plugins, onClick, editor, disabled } = this.props;
    const { map: pluginMap } = plugins || {};
    // 支持通过 heading.heading-1 的形式传入子按钮
    // 如果传入 heading 为主功能
    const toolbarItemSplit = toolbarItem.split('.');
    const pluginName = toolbarItemSplit[0];
    const btnName =
      toolbarItemSplit[1] === undefined ? 'button' : toolbarItemSplit[1];
    const plugin = pluginMap[pluginName];

    // - 配置了工具栏但没有相应插件的情形
    // - 没有工具栏的插件
    if (!plugin || !plugin.toolbar) {
      return null;
    }

    // TODO: 工具栏渲染能力待扩展，现在为插件定义一个组件传过来
    const ItemComponent = plugin.toolbar[btnName];

    return ItemComponent ? (
      <ItemComponent
        disabled={disabled}
        key={index}
        editor={editor}
        onClick={onClick}
      />
    ) : null;
  };

  render() {
    const { toolbar, clsPrefix, className, disabled } = this.props;
    const classNames = cx(clsPrefix, className, {
      [`${clsPrefix}-disabled`]: disabled,
    });

    return (
      <div className={classNames}>
        {toolbar.map((group, index) => {
          return this.renderGroup(group, index);
        })}
      </div>
    );
  }
}

export default Toolbar;
