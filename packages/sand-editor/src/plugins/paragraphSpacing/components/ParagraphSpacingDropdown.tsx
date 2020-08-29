import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import { message } from 'antd';
import { getSelectParagraphSpacing } from '../commands';
import BLOCKS from '../../../constants/blocks';
import './ParagraphSpacingDropdown.less';

const { PARAGRAPH_SPACING_TOP, PARAGRAPH_SPACING_BOTTOM } = BLOCKS;
const tips = {
  [PARAGRAPH_SPACING_TOP]: '段前距',
  [PARAGRAPH_SPACING_BOTTOM]: '段后距',
};

type ParagraphSpacingDropdownProps = {
  onClick: (...args: any[]) => any;
  editor?: any;
  psList: any[];
  psType: string;
};

class ParagraphSpacingDropdown extends React.Component<
  ParagraphSpacingDropdownProps,
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
   * @params type 下拉列表中选中的key
   */
  // eslint-disable-next-line no-unused-vars
  onChange = (type) => {
    const { psType, editor } = this.props;
    if (!editor) return;
    const psArray = type.split('paragraph_spacing_');
    if (!psArray[1]) {
      message.warn(
        `选择${psType === PARAGRAPH_SPACING_TOP ? '段前距' : '段后距'}出现问题`
      );
      return;
    }
    this.dropDown.hideDropdown();
    // 设置段间距大小
    editor.setParagraphSpacing(psArray[1], psType);
  };

  /**
   * 获取当前选中区域光标开头对应的段前段后
   */
  getParagraphSpacing = () => {
    const { editor, psType } = this.props;
    if (!editor) return '';
    const paragraphSpacing = getSelectParagraphSpacing(editor);
    const key = psType === PARAGRAPH_SPACING_TOP ? 'top' : 'bottom';
    if (paragraphSpacing && paragraphSpacing[key]) {
      return `paragraph_spacing_${paragraphSpacing[key]}`;
    }
    return '';
  };

  render() {
    const { onClick, editor, psList, psType, ...restProps } = this.props;

    return (
      <Dropdown
        className={
          psType === PARAGRAPH_SPACING_TOP
            ? 'se-ps-dropdown-top'
            : 'se-ps-dropdown-bottom'
        }
        value={this.getParagraphSpacing()}
        displayType="NO_CHANGE"
        list={psList}
        tip={tips[psType]}
        disabled={false}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default ParagraphSpacingDropdown;
