import { getItemDepth } from '../utils';
import { decreaseItemDepth, removeListNode, splitListItem } from '../commands';

/**
 * 按下回车处理方法
 * @param {*} event 事件
 * @param {*} editor 编辑器实例
 * @param {*} next 下一步
 */
export default function onEnter(event, editor, next) {
  if (!editor) return;
  const { value } = editor;
  const { startBlock } = value;
  const currentItem = startBlock;

  // 按回车时不是list
  if (!currentItem || !currentItem.data.get('list')) return next();
  event.preventDefault();

  if (!currentItem.text) {
    // leave>0
    if (getItemDepth(currentItem) > 0) {
      // 没有内容 等级>0时 按下回车 减leave
      return decreaseItemDepth(editor);
    }
    // 没有内容 等级=0时 按下回车，直接将list移除
    return removeListNode(editor);
  }

  // 调分割list指令
  return splitListItem(editor);
}
