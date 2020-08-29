import * as React from 'react';
import { Button } from '@jianghe/sand-editor-ui';
import { INLINES } from '../../../constants';
import { hasInline } from '../../../utils';
import { addLink } from '../commands';

const { LINK } = INLINES;
const tip = '链接';

type LinkButtonProps = {
  onClick?: (...args: any[]) => any;
  editor?: any;
};

class LinkButton extends React.Component<LinkButtonProps, {}> {
  onClick = () => {
    const { editor, onClick } = this.props;
    const change = addLink(editor, [editor.value.selection]);
    onClick(LINK, change);
  };

  isDisabled = () => {
    return !this.props.editor;
  };

  render() {
    const { editor, ...restProps } = this.props;
    const isActive = hasInline(editor, LINK);

    return (
      <Button
        tip={tip}
        disabled={this.isDisabled()}
        active={isActive}
        iconType="link"
        {...restProps}
        onClick={this.onClick}
      />
    );
  }
}

export default LinkButton;
