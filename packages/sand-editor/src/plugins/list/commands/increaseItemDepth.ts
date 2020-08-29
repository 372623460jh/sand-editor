import { getRangeItem } from '../utils';

/**
 * tab 操作list时要+leave等级
 * @param {*} editor 编辑器
 */
export default function increaseItemDepth(editor) {
  if (!editor) return;
  const { value } = editor;
  const currentList = getRangeItem(value);
  currentList.forEach((element) => {
    const { data } = element;
    if (!data.get('list')) return;
    editor.setNodeByKey(element.key, {
      data: {
        ...data.toJS(),
        list: {
          ...data.get('list'),
          level: data.get('list').level + 1,
        },
      },
    });
  });
  return editor;
}
