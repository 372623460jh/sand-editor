import * as React from 'react';
import cx from 'classnames';
import './Image.less';

type ImageProps = {
  attrs?: any;
  style?: any;
  isSelected?: boolean;
  isFocused?: boolean;
  attributes?: any;
  clsPrefix?: string;
  className?: string;
};

// 在编辑器内渲染的组件不要使用 FC
//   Function components cannot be given refs.
//    Attempts to access this ref will fail.
// eslint-disable-next-line react/prefer-stateless-function
class Image extends React.Component<ImageProps, {}> {
  static defaultProps = {
    clsPrefix: 'se-plugin-image',
  };

  render() {
    const {
      isFocused,
      clsPrefix,
      attributes,
      attrs,
      className,
      style,
    } = this.props;
    const classNames = cx(className, clsPrefix, {
      [`${clsPrefix}-focused`]: isFocused,
    });
    return (
      <img {...attributes} {...attrs} style={style} className={classNames} /> // eslint-disable-line
    );
  }
}

export default Image;
