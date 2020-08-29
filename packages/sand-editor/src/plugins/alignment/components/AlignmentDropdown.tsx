import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import setAlignment from '../commands/setAlignment';
import BLOCKS from '../../../constants/blocks';
import './AlignmentDropdown.less';

const { ALIGN_LEFT } = BLOCKS;
const tip = '对齐方式';
const defaultValue = ALIGN_LEFT;

type FontSizeDropdownProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  alignmentList?: any[];
};

class AlignmentDropdown extends React.Component<FontSizeDropdownProps, {}> {
  dropDown = null;

  onRef = (ref) => {
    this.dropDown = ref;
  };

  /**
   * 下拉列表改变回调
   * @params type 下拉列表中选中的key
   */
  onChange = (type) => {
    this.dropDown.hideDropdown();
    const { editor } = this.props;
    // 设置字体大小
    const alignArray = type.split('align-');
    // 设置字体大小
    setAlignment(editor, alignArray[1] || 'left');
  };

  // 当前光标处align
  getAlignment = () => {
    const { editor } = this.props;
    if (!editor) return false;
    const { value } = editor;
    const { selection, document } = value;
    // 是否是p标签
    const paragraph = document.getClosest(selection.start.key, (node) => {
      return node.type === 'paragraph';
    });
    const alignment =
      paragraph && paragraph.data.get('align')
        ? `align-${paragraph.data.get('align')}` || defaultValue
        : defaultValue;
    return alignment;
  };

  render() {
    const { onClick, editor, alignmentList, ...restProps } = this.props;

    return (
      <Dropdown
        className="sand-toolbar-btn-alignment"
        value={this.getAlignment() || defaultValue}
        displayType="ICON"
        list={alignmentList}
        tip={tip}
        dropdownTip={tip}
        disabled={false}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default AlignmentDropdown;
