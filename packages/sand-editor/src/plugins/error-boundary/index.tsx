import * as React from 'react';
import ErrorBoundary from './components/ErrorBoundary';

export default function ErrorBoundaryPlugin() {
  return {
    renderEditor(props, editor, next) {
      return <ErrorBoundary {...props}>{next()}</ErrorBoundary>;
    },
  };
}
