import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import { message } from 'antd';
import { getSelectRowSpacing } from '../commands';
import BLOCKS from '../../../constants/blocks';
import './RowSpacingDropdown.less';

const { ROW_SPACING } = BLOCKS;
const tips = {
  [ROW_SPACING]: '行间距',
};

type RowSpacingDropdownProps = {
  onClick: (...args: any[]) => any;
  editor?: any;
  rsList: any[];
};

class RowSpacingDropdown extends React.Component<RowSpacingDropdownProps, {}> {
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
  onChange = (type) => {
    const { editor } = this.props;
    if (!editor) return;
    const rsArray = type.split('row_spacing_');
    if (!rsArray[1]) {
      message.warn('选择行间距出现问题');
      return;
    }
    this.dropDown.hideDropdown();
    // 设置段间距大小
    editor.setRowSpacing(rsArray[1]);
  };

  /**
   * 获取当前选中区域光标开头对应的段前段后
   */
  getRowSpacing = () => {
    const { editor } = this.props;
    if (!editor) return '';
    const rowSpacing = getSelectRowSpacing(editor);
    if (rowSpacing) {
      return `row_spacing_${rowSpacing}`;
    }
    return '';
  };

  render() {
    const { onClick, editor, rsList, ...restProps } = this.props;

    return (
      <Dropdown
        className="se-rs-dropdown"
        value={this.getRowSpacing()}
        displayType="NO_CHANGE"
        list={rsList}
        tip={tips[ROW_SPACING]}
        disabled={false}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default RowSpacingDropdown;
