import * as React from 'react';
import BackColorButton from './components/BackColorButton';

export default function toolbar(options = {}) {
  // @ts-ignore
  const { colors, defaultColor } = options;

  return {
    button: (props) => (
      <BackColorButton colors={colors} defaultValue={defaultColor} {...props} />
    ),
  };
}
