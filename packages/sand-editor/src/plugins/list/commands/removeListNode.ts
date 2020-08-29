import { getRangeItem } from '../utils';
import { BLOCKS } from '../../../constants';

/**
 * 移除list节点
 * @param {*} editor 编辑器实例
 */
export default function removeListNode(editor) {
  if (!editor) return;
  const { value } = editor;
  // 获取选中block list
  const currentList = getRangeItem(value);
  const { data } = currentList.get(0);
  if (!data.get('list')) return editor;
  currentList.forEach((element) => {
    // 移除listData,并设置为PARAGRAPH
    editor.setNodeByKey(element.key, {
      type: BLOCKS.PARAGRAPH,
      data: data.delete('list'),
    });
  });
  return editor;
}
