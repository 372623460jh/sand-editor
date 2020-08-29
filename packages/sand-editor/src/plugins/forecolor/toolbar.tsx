import * as React from 'react';
import ForeColorButton from './components/ForeColorButton';

export default function toolbar(options = {}) {
  // @ts-ignore
  const { colors, defaultColor } = options;

  return {
    button: (props) => (
      <ForeColorButton colors={colors} defaultValue={defaultColor} {...props} />
    ),
  };
}
