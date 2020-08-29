import * as React from 'react';
import Image from '../components/Image';

export function createInlineRenderer(options) {
  return function renderInline(props, editor, next) {
    const { node, attributes, isFocused, isSelected } = props;

    if (node.type === options.type) {
      const attrs = node.data.get('attrs');
      const className = node.data.get('className');
      const style = node.data.get('style');

      return (
        <Image
          attributes={attributes}
          isFocused={isFocused}
          isSelected={isSelected}
          attrs={attrs}
          style={style}
          className={className}
        />
      );
    }

    return next();
  };
}
