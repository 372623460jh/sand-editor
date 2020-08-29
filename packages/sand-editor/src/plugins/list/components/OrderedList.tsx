import * as React from 'react';
import ToolbarButton from '../../../components/ToolbarButton';
import { BLOCKS } from '../../../constants';
import { toggleListBlock } from '../commands';
import { isActive, isDisabled } from '../utils';

type OrderedListProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class OrderedList extends React.Component<OrderedListProps, {}> {
  onClick = () => {
    const { editor } = this.props;
    toggleListBlock(editor, BLOCKS.OL_LIST);
  };

  render() {
    const { onClick, editor, ...restProps } = this.props;
    return (
      <ToolbarButton
        iconType="ordered-list"
        active={isActive(BLOCKS.OL_LIST, editor)}
        disabled={isDisabled(editor)}
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default OrderedList;
