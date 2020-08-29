import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { BLOCKS, COMMANDS } from '../../../constants';
import { isSelectionInHr } from '../utils';

const { HR } = BLOCKS;
const tip = '插入水平线';

type HrButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class HrButton extends React.Component<HrButtonProps, {}> {
  onClick = () => {
    const { onClick, editor } = this.props;
    const change = editor[COMMANDS.INSERT_HR]();
    onClick(HR, change);
  };

  isDisabled = () => {
    const { editor } = this.props;
    if (!editor) {
      return true;
    }
    return isSelectionInHr(editor.value);
  };

  render() {
    const { onClick, editor, ...restProps } = this.props;

    return (
      <Button
        tip={tip}
        disabled={this.isDisabled()}
        iconType="hr"
        onClick={this.onClick}
        {...restProps}
      />
    );
  }
}

export default HrButton;
