import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import setFontSize from '../commands/setFontSize';
import { COMMON_MARK_KEY_ENUM } from '../../marks/config';
import getSelectionCommonMarkData from '../../marks/utils/getSelectionCommonMarkData';
import { getDefaultFontSize } from '../config';
import './FontSizeDropdown.less';

const tip = '字体大小';

type FontSizeDropdownProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  fontSizeList?: any[];
};

class FontSizeDropdown extends React.Component<FontSizeDropdownProps, {}> {
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
    const fontSizeArray = type.split('font_size_');
    const { editor } = this.props;
    // 设置字体大小
    setFontSize(editor, fontSizeArray[1] || getDefaultFontSize());
  };

  getFontSize = () => {
    // 当前选中的字号
    const { editor } = this.props;
    const fontSize =
      getSelectionCommonMarkData(editor, COMMON_MARK_KEY_ENUM.fontSize) ||
      getDefaultFontSize();
    return `font_size_${fontSize}`;
  };

  render() {
    const { onClick, editor, fontSizeList, ...restProps } = this.props;
    return (
      <Dropdown
        className="se-toolbar-btn-font-Size"
        value={this.getFontSize()}
        list={fontSizeList}
        tip={tip}
        disabled={false}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default FontSizeDropdown;
