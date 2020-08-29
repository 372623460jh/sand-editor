import { BLOCKS } from '../../../constants';
/**
 * 校验当前toolbar按钮是否被激活
 * 校验是否被激活
 * 校验光标选择区域开头是不是list并且类型是ol
 *
 * @param {*} type 需要校验的block类型, 该方法只校验有序列表无序列表
 * @param {*} editor 编辑器实例
 */
export default function isActive(listType, editor) {
  if (!editor) return false;
  const { value } = editor;
  const { selection, document } = value;
  const listItem = document.getClosest(selection.start.key, (node) => {
    const { type } = node;
    return type === BLOCKS.LIST_ITEM;
  });
  if (!listItem) {
    return false;
  }
  const list = listItem.data.get('list');
  return list && list.type === listType;
}
