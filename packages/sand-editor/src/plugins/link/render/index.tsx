import * as React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@jianghe/sand-editor-ui';
import { window, document } from 'ssr-window';
import { INLINES } from '../../../constants';
import './index.less';

type LinkProps = {
  href?: string;
  target?: string;
  editor?: any;
  node?: any;
  [key: string]: any;
};

// @TODO: 编辑框input输入时光标问题
// @TODO: 抽象portal功能
// @TODO: 编辑框单例化, 存在同时出现多个
class Link extends React.Component<LinkProps, {}> {
  static defaultProps = {
    href: '',
    target: '_blank',
  };

  constructor(props) {
    super(props);
    // @ts-ignore
    this.editBarWrapper = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.editBarWrapper);
    // 点击隐藏编辑框
    this.globalHideEditBar = (e) => {
      if (this.editBar && this.editBar.contains(e.target)) {
        return false;
      }
      if (!this.linkNode) {
        return false;
      }
      if (this.props.node.data.get('showEditBar')) {
        this.toggleEditBar(false, true);
      }
    };
    document.body.addEventListener('click', this.globalHideEditBar);
    // 新建时获取焦点
    if (this.props.node.data.get('showEditBar')) {
      this.forceUpdate(() => {
        this.editBar.querySelector('input').focus();
      });
    }
  }

  componentWillUnmount() {
    document.body.removeChild(this.editBarWrapper);
    document.body.removeEventListener('click', this.globalHideEditBar);
  }

  editBar: any;

  editBarWrapper: any;

  globalHideEditBar: any;

  linkNode: any;

  timer: any;

  // 输入框变化 修改链接 href
  change = (event) => {
    const href = event.target.value;
    const node = this.props;
    const data = node.node.data.toJS();
    data.attrs.href = href;
    this.props.editor.setNodeByKey(node.node.key, { data });
  };

  // 回车关闭编辑框
  entryKeyComfirm = (e) => {
    if (e.keyCode === 13) {
      this.toggleEditBar(false, true, true);
    }
  };

  // 编辑框定位样式
  getEditBarStyle = () => {
    if (!this.linkNode) {
      return {};
    }
    const rect = this.linkNode.getBoundingClientRect();
    return {
      top: rect.top + rect.height + 8 + document.scrollingElement.scrollTop,
      left: rect.left + document.scrollingElement.scrollLeft,
    };
  };

  // 切换编辑框显示
  toggleEditBar = (value, immediate = false, force = false) => {
    if (
      !force &&
      this.editBar &&
      this.editBar.contains(document.activeElement)
    ) {
      return false;
    }
    const showEditBar =
      value === undefined ? !this.props.node.data.get('showEditBar') : value;
    const action = () => {
      this.props.editor.setNodeByKey(this.props.node.key, {
        data: {
          ...this.props.node.data.toJS(),
          showEditBar,
        },
      });
    };
    clearTimeout(this.timer);
    if (immediate) {
      action();
    } else {
      this.timer = setTimeout(action, immediate ? 0 : 250);
    }
  };

  // 删除链接
  removeLink = () => {
    const node = this.props;
    this.props.editor.unwrapInlineByKey(node.node.key, {
      type: INLINES.LINK,
    });
  };

  // 打开链接
  openLink = () => {
    window.open(this.props.href, 'se-editor-link');
  };

  render() {
    const { children, href, target = '_blank' } = this.props;
    return (
      <>
        <a
          href={href}
          target={target}
          // eslint-disable-next-line
          ref={(ref) => (this.linkNode = ref)}
          onMouseEnter={() => {
            this.toggleEditBar(true);
          }}
          onMouseLeave={() => {
            this.toggleEditBar(false);
          }}
        >
          {children}
        </a>
        {this.props.node.data.get('showEditBar') &&
          ReactDOM.createPortal(
            <div
              ref={(ref) => {
                this.editBar = ref;
              }}
              className="se-link-editbar"
              style={this.getEditBarStyle()}
              onMouseEnter={() => {
                this.toggleEditBar(true);
              }}
              onMouseLeave={() => {
                this.toggleEditBar(false);
              }}
            >
              <input
                type="text"
                className="se-link-editbar-input"
                placeholder="请输入链接或锚点，回车确认"
                value={href}
                onChange={this.change}
                onKeyDown={this.entryKeyComfirm}
              />
              <span className="se-link-editbar-split" />
              <Button iconType="link" onClick={this.openLink} tip="打开链接" />
              <Button
                iconType="delete"
                onClick={this.removeLink}
                tip="取消链接"
              />
            </div>,
            this.editBarWrapper
          )}
      </>
    );
  }
}

export function renderInline(props, editor, next) {
  const { children, node } = props;
  if (node.type === INLINES.LINK) {
    const href = (node.data.get('attrs') || {}).href || '';
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return next();
}
