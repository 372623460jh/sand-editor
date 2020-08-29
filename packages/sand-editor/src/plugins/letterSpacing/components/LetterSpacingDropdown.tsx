import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import { getDefaultLetterSpacing } from '../config';
import { COMMON_MARK_KEY_ENUM } from '../../marks/config';
import getSelectionCommonMarkData from '../../marks/utils/getSelectionCommonMarkData';
import './LetterSpacingDropdown.less';

const tip = '字间距';

type LetterSpacingDropdownProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  letterSpacingList?: any[];
};

class LetterSpacingDropdown extends React.Component<
  LetterSpacingDropdownProps,
  {}
> {
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
    const letterSpacingArray = type.split('letter_spacing_');
    const { editor } = this.props;
    // 设置字间距大小
    editor.setLetterSpacing(letterSpacingArray[1] || getDefaultLetterSpacing());
  };

  /**
   * 获取当前选中区域字间距大小
   */
  getLetterSpacing = () => {
    const { editor } = this.props;
    const letterSpacing =
      getSelectionCommonMarkData(editor, COMMON_MARK_KEY_ENUM.letterSpacing) ||
      getDefaultLetterSpacing();
    return `letter_spacing_${letterSpacing}`;
  };

  render() {
    const { onClick, editor, letterSpacingList, ...restProps } = this.props;
    return (
      <Dropdown
        className="se-toolbar-btn-letter-spacing"
        value={this.getLetterSpacing()}
        displayType="NO_CHANGE"
        list={letterSpacingList}
        tip={tip}
        disabled={false}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default LetterSpacingDropdown;
