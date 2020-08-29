import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import { getSelectParagraphBothEndsPadding } from '../commands';
import BLOCKS from '../../../constants/blocks';
import './ParagraphBothEndsPaddingDropdown.less';

const { PARAGRAPH_BOTH_ENDS_PADDING } = BLOCKS;

type ParagraphBothEndsPaddingDropdownProps = {
  onClick: (...args: any[]) => any;
  editor?: any;
  psList: any[];
  psType: string;
};

class ParagraphBothEndsPaddingDropdown extends React.Component<
  ParagraphBothEndsPaddingDropdownProps,
  {}
> {
  static defaultProps = {
    editor: null,
  };

  dropDown = null;

  onRef = (ref) => {
    this.dropDown = ref;
  };

  /**
   * 下拉列表改变回调
   * @params size 下拉列表中选中的 key 值
   */
  onChange = (size) => {
    const { psType, editor } = this.props;
    if (!editor) return;
    this.dropDown.hideDropdown();
    editor.setParagraphBothEndsPadding(size, psType);
  };

  /**
   * 获取当前选中区域光标开头对应的双端缩进
   */
  getParagraphBothEndsPadding = () => {
    const { editor, psType } = this.props;
    if (!editor) return '';
    return getSelectParagraphBothEndsPadding(editor);
  };

  render() {
    const { onClick, editor, psList, psType, ...restProps } = this.props;

    return (
      <Dropdown
        className="se-ps-dropdown"
        value={this.getParagraphBothEndsPadding()}
        displayType="NO_CHANGE"
        list={psList}
        tip="两端缩进"
        disabled={false}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default ParagraphBothEndsPaddingDropdown;
