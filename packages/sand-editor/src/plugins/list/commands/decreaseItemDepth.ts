import { getRangeItem } from '../utils';

/**
 * shift+tab 操作list时要-leave等级
 * @param {*} editor 编辑器实例
 */
export default function decreaseItemDepth(editor) {
  if (!editor) return;
  const { value } = editor;
  // 获取选中blocks
  const currentList = getRangeItem(value);
  currentList.forEach((element) => {
    const { data } = element;
    // 不是list
    if (!data.get('list')) return;
    // 0是最低等级
    if (data.get('list').level < 1) return;
    // 设置list等级
    editor.setNodeByKey(element.key, {
      data: {
        ...data.toJS(),
        list: {
          ...data.get('list'),
          level: data.get('list').level - 1,
        },
      },
    });
  });
  return editor;
}
