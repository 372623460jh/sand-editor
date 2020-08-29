/**
 * 获取list节点等级
 * @param {} item list node
 */
export default function getItemDepth(item) {
  return item.data.get('list').level;
}
