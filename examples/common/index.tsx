// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.less';

class Index extends React.Component {
  state = {
    entryMap: __entryMap__,
  };

  renderRouter() {
    const { entryMap } = this.state;
    const entryMapArr = Object.keys(entryMap);
    const arr = [];
    entryMapArr.forEach((item) => {
      if (item !== 'index') {
        arr.push(
          <div key={item} className={styles.listItem}>
            <a href={`/${item}.html`}>{item}</a>
            <br />
          </div>
        );
      }
    });
    return arr;
  }

  render() {
    return <div className={styles.list}>{this.renderRouter()}</div>;
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
