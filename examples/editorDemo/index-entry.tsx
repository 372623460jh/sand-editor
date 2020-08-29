import React from 'react';
import ReactDOM from 'react-dom';
import AllPlugins from './components/AllPlugins';
import styles from './index.module.less';

class TodoList extends React.PureComponent {
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.header}>Sand Editor Header</div>
        <AllPlugins />
      </div>
    );
  }
}

ReactDOM.render(<TodoList />, document.getElementById('root'));
