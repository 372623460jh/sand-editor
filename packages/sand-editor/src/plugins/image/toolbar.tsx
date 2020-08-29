import * as React from 'react';
import ImageButton from './components/ImageButton';

// eslint-disable-next-line no-unused-vars
export default function toolbar(options) {
  const { onBtnClick, tip } = options;

  return {
    button: (props) => (
      <ImageButton
        {...props}
        onBtnClick={onBtnClick}
        tip={tip}
        options={options}
      />
    ),
  };
}
