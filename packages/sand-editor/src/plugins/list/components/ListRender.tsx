import * as React from 'react';
import ReactDOM from 'react-dom';
import { BLOCKS } from '../../../constants';
/**
 * 计算并设置相关节点对应的排序
 * @param listItem 节点dom
 * @param listConfigId 节点id
 * @param listConfigLevel 节点等级
 */
function updateListItemOrder(listItem, listConfigId, listConfigLevel) {
  let order = 1;
  if (listItem.previousElementSibling) {
    // 前一个兄弟节点
    let prevListItem = listItem.previousElementSibling;
    while (prevListItem) {
      const isOrderedListItem = prevListItem.tagName.toLowerCase() === 'ol';
      if (!isOrderedListItem) {
        // 前一个兄弟节点是ol
        prevListItem = prevListItem.previousElementSibling;
        // eslint-disable-next-line
        continue;
      }
      if (prevListItem.getAttribute('data-listid') !== listConfigId) {
        // 上一个ol节点和当前节点ID不一致
        break;
      }
      // item的等级 同等级间进行排序
      const level = parseInt(prevListItem.getAttribute('data-level'), 10);
      if (level < listConfigLevel) {
        // 兄弟节点level比当前节点低
        break; // order = 1
      }
      if (level === listConfigLevel) {
        // 等级相同，id相同，在之前的start上+1
        order = parseInt(prevListItem.getAttribute('start'), 10) + 1;
        break;
      }
      // level > listConfigLevel
      prevListItem = prevListItem.previousElementSibling;
    }
  }
  listItem.setAttribute('start', order);
}
type ListRenderProps = {
  node?: any;
};

class ListRender extends React.Component<ListRenderProps, {}> {
  componentDidMount() {
    const { node } = this.props;
    const listConfig = node.data.get('list') || {};
    if (listConfig.type === BLOCKS.OL_LIST) {
      this.updateCurrentListItemOrder();
      this.updateAfterListItemOrder(listConfig.listId, listConfig.level, +1);
    }
  }

  componentDidUpdate(prevProps) {
    const { node } = this.props;
    const prevNode = prevProps.node;
    const listConfig = node.data.get('list') || {};
    const prevListConfig = prevNode.data.get('list') || {};
    if (
      prevListConfig.type !== BLOCKS.OL_LIST &&
      listConfig.type !== BLOCKS.OL_LIST
    ) {
      return;
    }
    if (
      prevListConfig.type === BLOCKS.OL_LIST &&
      listConfig.type !== BLOCKS.OL_LIST
    ) {
      this.updateAfterListItemOrder(
        prevListConfig.listId,
        prevListConfig.level,
        -1
      );
    } else if (
      prevListConfig.type !== BLOCKS.OL_LIST &&
      listConfig.type === BLOCKS.OL_LIST
    ) {
      this.updateCurrentListItemOrder();
      this.updateAfterListItemOrder(listConfig.listId, listConfig.level, +1);
    } else if (prevListConfig.level !== listConfig.level) {
      this.updateCurrentListItemOrder();
      // @ts-ignore
      this.updateAfterListItemOrder(
        prevListConfig.listId,
        prevListConfig.level
      );
      // @ts-ignore
      this.updateAfterListItemOrder(listConfig.listId, listConfig.level);
    }
  }

  componentWillUnmount() {
    const { node } = this.props;
    const listConfig = node.data.get('list');
    if (listConfig.type === BLOCKS.OL_LIST) {
      this.updateAfterListItemOrder(listConfig.listId, listConfig.level, -1);
    }
  }

  /**
   * 更新当前ol对应的序列
   */
  updateCurrentListItemOrder() {
    const { node } = this.props;
    const listConfig = node.data.get('list');
    // eslint-disable-next-line
    const currentListItem = ReactDOM.findDOMNode(this); // 获取dom
    updateListItemOrder(currentListItem, listConfig.listId, listConfig.level);
  }

  /**
   * 更新当前节点之后的序列
   * @param {*} listConfigId listId
   * @param {*} listConfigLevel 等级
   * @param {*} delta 排序增加多少
   */
  updateAfterListItemOrder(listConfigId, listConfigLevel, delta) {
    // eslint-disable-next-line
    let currentListItem = ReactDOM.findDOMNode(this);
    let nextListItem = currentListItem.nextElementSibling;
    while (nextListItem) {
      const isOrderedListItem = nextListItem.tagName.toLowerCase() === 'ol';
      if (!isOrderedListItem) {
        nextListItem = nextListItem.nextElementSibling;
        // eslint-disable-next-line
        continue;
      }
      if (nextListItem.getAttribute('data-listid') !== listConfigId) {
        break;
      }
      const level = parseInt(nextListItem.getAttribute('data-level'), 10);
      if (level < listConfigLevel) {
        break;
      }
      if (level > listConfigLevel || delta === undefined) {
        updateListItemOrder(nextListItem, listConfigId, level);
      } else {
        const nextListItemOrder = parseInt(
          nextListItem.getAttribute('start'),
          10
        );
        nextListItem.setAttribute('start', nextListItemOrder + delta);
      }
      nextListItem = nextListItem.nextElementSibling;
    }
  }

  render() {
    const { node, children } = this.props;
    const paragraph = <p>{children}</p>;
    // @ts-ignore
    const listConfig = node.data.get('list');
    const isList = !!listConfig;
    if (!isList) {
      return paragraph;
    }
    const { listId, type, level = 0 } = listConfig;
    const style = {
      paddingLeft: level * 23,
    };
    if (type === BLOCKS.OL_LIST) {
      return (
        <ol
          className="sand-editor-ol"
          // @ts-ignore
          start="1"
          style={style}
          data-listid={listId}
          data-level={level}
        >
          <li className="sand-editor-li">{children}</li>
        </ol>
      );
    }
    return (
      <ul
        className="sand-editor-ul"
        // @ts-ignore
        start="1"
        style={style}
        data-listid={listId}
        data-level={level}
      >
        <li className="sand-editor-li">{children}</li>
      </ul>
    );
  }
}
export default ListRender;
