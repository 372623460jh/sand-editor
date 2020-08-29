import { getRangeItem } from '../utils';
import { BLOCKS } from '../../../constants';

/**
 * 设置block为list
 * @param {*} editor 编辑器实例
 * @param {*} newData svi中的data
 * @param {*} type 需要设置的list的类型(有type说明是list间切换，没type说明是list设置)
 */
export default function toggleList(editor, newData) {
  if (!editor) return;
  const { value } = editor;
  // 选中的所有block
  const currentList = getRangeItem(value);
  let newDataContent;
  currentList.forEach((element) => {
    const { data } = element;
    newDataContent = {
      ...data.toJS(),
      list: newData.list,
    };
    editor.setNodeByKey(element.key, {
      type: BLOCKS.LIST_ITEM,
      data: newDataContent,
    });
  });
  return editor;
}
