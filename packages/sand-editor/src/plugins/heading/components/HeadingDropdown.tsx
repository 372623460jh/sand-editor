import * as React from 'react';
import { Dropdown } from '@jianghe/sand-editor-ui';
import { BLOCKS, COMMANDS } from '../../../constants';
import { getClosestParagraph } from '../utils';
import './HeadingDropdown.less';

const { PARAGRAPH } = BLOCKS;
const { SET_HEADING } = COMMANDS;
const tip = '正文与标题';

type HeadingDropdownProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
  headingList?: any[];
};

class HeadingDropdown extends React.Component<HeadingDropdownProps, {}> {
  dropDown = null;

  onRef = (ref) => {
    this.dropDown = ref;
  };

  onChange = (type) => {
    this.dropDown.hideDropdown();
    const { onClick, editor } = this.props;
    const change = editor[SET_HEADING]({ type });
    onClick(type, change);
  };

  isDisabled = () => {
    const { editor } = this.props;
    return !editor;
  };

  getBlockType = () => {
    const { editor } = this.props;
    if (!editor) {
      return PARAGRAPH;
    }
    const block = getClosestParagraph(editor.value);
    return block ? block.type : PARAGRAPH;
  };

  render() {
    const { onClick, editor, headingList, ...restProps } = this.props;

    return (
      <Dropdown
        className="se-toolbar-btn-heading"
        value={this.getBlockType()}
        list={headingList}
        tip={tip}
        disabled={this.isDisabled()}
        onChange={this.onChange}
        onRef={this.onRef}
        {...restProps}
      />
    );
  }
}

export default HeadingDropdown;
