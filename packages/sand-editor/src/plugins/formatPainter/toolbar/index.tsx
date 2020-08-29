import * as React from 'react';
import FormatPainterButton from '../components/formatPainterButton';

export default function toolbar(options) {
  const { formatPainter = {} } = options;
  return {
    button: (props) => (
      <FormatPainterButton formatPainterConfig={formatPainter} {...props} />
    ),
  };
}
