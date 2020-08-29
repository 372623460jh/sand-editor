/**
 * 判断节点是不是一个list
 * @param {*} node 节点
 */
export default function isList(node) {
  const { data } = node;
  return !!data.get('list');
}
