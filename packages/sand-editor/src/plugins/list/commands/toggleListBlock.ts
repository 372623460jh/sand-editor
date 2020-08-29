import { getSelectionListType, getListId } from '../utils';
import removeListNode from './removeListNode';
import toggleList from './toggleList';

/**
 * 设置list指令
 * @param {*} editor 编辑器实例
 * @param {*} type 类型
 */
export default function toggleListBlock(editor, type) {
  const { value } = editor;
  const data = {
    list: {
      // @ts-ignore
      listId: getListId(value), // listId
      level: 0, // 级别，按tab时级别会有变化，不同的级别展示不一样
      type, // 类型
    },
  };

  // 获取选中区域第一个block，看其是否有list数据，有返回list数据，没有返回null
  const { listType, listData } = getSelectionListType(value);

  /* 已在列表中 */
  if (listType === 'YY') {
    if (listData === type) {
      // 选中的和点击的工具栏按钮类型相同
      removeListNode(editor);
      return editor.focus();
    }
    // 切换为不同list类型
    toggleList(editor, data);
    return editor.focus();
  }

  // 有不是list的block，全设置为指定list
  toggleList(editor, data);
  return editor.focus();
}
