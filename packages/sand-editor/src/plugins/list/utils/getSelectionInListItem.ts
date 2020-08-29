import getRangeItem from './getRangeItem';

/**
 * 获取选中区间中的list数据
 * @param {*} value
 */
export default function getSelectionInListItem(value) {
  if (!value) return null;
  // 获取当前选中的所有节点对应的层级最深的block集合
  const blocks = getRangeItem(value);
  if (!blocks) return null;
  const list = blocks.get(0).data.get('list');
  return list || null;
}
