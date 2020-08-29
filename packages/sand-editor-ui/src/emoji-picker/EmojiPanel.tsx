import * as React from 'react';
import cx from 'classnames';
import './EmojiPanel.less';

type EmojiPanelProps = {
  clsPrefix?: string;
  className?: string;
  // emojilist
  emojis?: any[];
  // 改变回调
  onChange?: (...args: any[]) => any;
  // 列数
  columnsNum?: number;
};

class EmojiPanel extends React.PureComponent<EmojiPanelProps, {}> {
  static defaultProps = {
    clsPrefix: 'sand-emoji-panel',
    emojis: [],
    onChange: () => {},
    columnsNum: 9,
  };

  onChange = (e, emoji) => {
    const { onChange } = this.props;
    onChange(emoji);
  };

  /**
   * 渲染每一个emoji表情
   */
  renderItem = (row) => {
    // eslint-disable-next-line
    const that = this;
    const { emojis = [], columnsNum, clsPrefix } = this.props;
    // 预估的该行结束下标
    const preEndSub = row * columnsNum - 1;
    // 该行开始的下标
    const startSub = (row - 1) * columnsNum;
    // 该行结束下标
    const endSub =
      preEndSub <= emojis.length - 1 ? preEndSub : emojis.length - 1;
    const length = endSub - startSub + 1;
    const rowArr = [];
    for (let n = 0; n < length; n++) {
      const sub = startSub + n;
      rowArr.push(
        // eslint-disable-next-line
        (function (emoji) {
          return (
            // eslint-disable-next-line
            <div
              className={`${clsPrefix}-emoji-item`}
              onClick={(e) => {
                that.onChange(e, emoji);
              }}
            >
              {emoji.text}
            </div>
          );
        })(emojis[sub])
      );
    }
    return rowArr;
  };

  /**
   * 渲染行
   */
  renderRow = () => {
    const { emojis = [], columnsNum, clsPrefix } = this.props;
    // eslint-disable-next-line
    const rowNum = ~~((emojis.length - 1) / columnsNum) + 1;
    const rowArr = [];
    for (let n = 0; n < rowNum; n++) {
      rowArr.push(
        <div className={`${clsPrefix}-emoji-row`}>{this.renderItem(n + 1)}</div>
      );
    }
    return rowArr;
  };

  render() {
    const { clsPrefix, className } = this.props;
    return <div className={cx(className, clsPrefix)}>{this.renderRow()}</div>;
  }
}

export default EmojiPanel;
