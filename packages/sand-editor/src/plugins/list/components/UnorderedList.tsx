import * as React from 'react';
import ToolbarButton from '../../../components/ToolbarButton';
import { BLOCKS } from '../../../constants';
import { toggleListBlock } from '../commands';
import { isActive, isDisabled } from '../utils';

type UnorderedListProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class UnorderedList extends React.Component<UnorderedListProps, {}> {
  onClick = () => {
    const { editor } = this.props;
    toggleListBlock(editor, BLOCKS.UL_LIST);
  };

  render() {
    const { onClick, editor, ...restProps } = this.props;

    return (
      <ToolbarButton
        iconType="unordered-list"
        active={isActive(BLOCKS.UL_LIST, editor)}
        disabled={isDisabled(editor)}
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default UnorderedList;
