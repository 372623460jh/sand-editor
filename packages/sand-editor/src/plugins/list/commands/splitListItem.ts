import { getRangeItem } from '../utils';

/**
 * 分割list block
 * @param {*} editor 编辑器实例
 */
export default function splitListItem(editor) {
  if (!editor) return;
  const { value } = editor;
  const { selection } = value;
  const currentItem = getRangeItem(value);
  const splitOffset = selection.start.offset;
  const startKey = selection.start.key;

  if (!currentItem) return editor;
  if (!currentItem.get(0).data.get('list')) return editor;

  // 分割内容
  editor.splitDescendantsByKey(currentItem.get(0).key, startKey, splitOffset);

  // 分割后重新获取内容block
  const newItem = getRangeItem(value).get(0);

  const { data } = newItem;
  // 不是list
  if (!data.get('list')) return editor;
  // 复制分割前的data给分割后的新节点
  editor.setNodeByKey(newItem.key, {
    data: {
      ...data.toJS(),
      list: {
        ...data.get('list'),
      },
    },
  });
  return editor;
}
