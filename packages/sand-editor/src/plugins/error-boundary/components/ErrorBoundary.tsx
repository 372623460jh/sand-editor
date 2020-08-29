import * as React from 'react';

const rxUnableFindDOMNode = /Unable to find a DOM node for "([\d]+)"\./;

type ErrorBoundaryProps = {
  value?: any;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, {}> {
  componentDidCatch(error) {
    if (rxUnableFindDOMNode.test(error.message)) {
      const { value } = this.props;
      const { document } = value;
      const match = error.message.match(rxUnableFindDOMNode);
      const key = match[1];
      const descendantNode = document.getDescendant(key);
      const ancestors = document.getAncestors(descendantNode.key);
      // 注意，这里是 Immutable List，不是普通数组
      const nodes = ancestors.push(descendantNode);
      const stack = nodes.reduce((acc, node) => {
        const type = node.type ? `[${node.type}]` : '';
        const data = node.data ? JSON.stringify(node.data.toJS()) : '';
        return `${acc}\n  ${node.object}${type}${data}`;
      }, '');
      throw new Error(`Unable to find a DOM node in updateSelection.${stack}`);
    }

    throw error;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
