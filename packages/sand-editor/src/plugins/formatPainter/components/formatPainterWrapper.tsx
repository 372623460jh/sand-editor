import * as React from 'react';

const icon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAYAAAFV3XwhAAAAAXNSR0IArs4c6QAAAPBJREFUOBGNk80NwjAMhV0EJxiBERmEiVgBtkDiwA0uiAM/At4X7CitmraWXmI7z47tNmZmZ6Ff6idvBYBmrmXt0ehP4Yu9ZAlppOBlJyxJooUxk3Jw4xFO9kyXTkSJhnxI5P5b/zWnp6w++bgzkthWDjAoNBsNU2hZT76yzHCRQROBm/QXhIhED4Ec/mM4u3vrGgY3KpB2jkEynUHc+x6dEnQVmFkNd52lWeaBykGtpS0z/SMLlBE5leetpsuDCXoad/CmJKpyJk3bb4rfmCdRFQbMbeWgu2QGDqe3KirinW6Ele+1dwuXj9H9IHKZ/QDGCkHllFqj6gAAAABJRU5ErkJggg==';

type FormatPainterWrapperProps = {
  editor?: any;
  children: any;
};

/**
 * 用于展示格式刷光标
 */
export default class FormatPainterWrapper extends React.Component<
  FormatPainterWrapperProps
> {
  isFormatPainterActive() {
    const { editor } = this.props;
    const { value } = editor;
    const formatClipboard = value.data.get('formatClipboard');
    return formatClipboard && formatClipboard.trigger === 'toolbar';
  }

  render() {
    const { children } = this.props;
    // 验证children是否只有一个子节点
    const onlyChild = React.Children.only(children);
    const onlyChildProps = onlyChild.props;
    const onlyChildStyle = onlyChildProps.style;
    // 指针样式
    return React.cloneElement(onlyChild, {
      ...onlyChildProps,
      style: {
        ...onlyChildStyle,
        cursor: this.isFormatPainterActive() ? `url(${icon}),auto` : 'auto',
      },
    });
  }
}
