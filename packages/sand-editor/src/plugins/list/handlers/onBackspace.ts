import { isEmpty, getItemDepth } from '../utils';
import { decreaseItemDepth, removeListNode } from '../commands';

/**
 * 回退事件
 * @param {*} event 事件
 * @param {*} editor 编辑器
 * @param {*} next 下一步
 */
export default function onBackspace(event, editor, next) {
  if (!editor) return;
  const { value } = editor;
  const { selection, startBlock } = value;
  // 有选中
  if (selection.isExpanded) return next();
  // 锚点没在当前行首部
  if (selection.start.offset > 0) return next();
  // 当前节点
  const currentItem = value.startBlock;
  if (!currentItem) return next();
  // 当前锚点是否在节点首部
  const isAtBlockStart = selection.anchor.isAtStartOfNode(startBlock);

  // 还有内容且锚点不在节点首部，执行跳过本handler进行删除内容
  if (!isEmpty(currentItem) && !isAtBlockStart) return next();

  // 不是list跳过
  if (!currentItem.data.get('list')) return next();

  // 锚点在节点首部 且 leave不等于0时,回退要-等级
  if (isAtBlockStart && getItemDepth(currentItem) > 0) {
    return decreaseItemDepth(editor);
  }

  // 将list改成普通文本
  event.preventDefault();
  return removeListNode(editor);
}
