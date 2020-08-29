import { List } from 'immutable';

/**
 * 获取当前选中的所有节点对应的层级最深的block集合
 * @param {*} value svi
 */
function getRangeItem(value) {
  // 当前选择
  const { selection, document } = value;
  const ranges = [selection];

  // 选取范围内所有层级最深的block集合
  const blocks = ranges.reduce((list, range) => {
    return list.concat(document.getLeafBlocksAtRange(range));
  }, List());
  return blocks;
}

export default getRangeItem;
