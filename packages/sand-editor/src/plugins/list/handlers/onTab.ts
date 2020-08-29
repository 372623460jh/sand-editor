import { getRangeItem, getSelectionInListItem } from '../utils';
import { decreaseItemDepth, increaseItemDepth } from '../commands';

/**
 * 按下tab回调
 * @param {*} event 事件
 * @param {*} editor 编辑器实例
 * @param {*} next 下一步方法
 */
function onTab(event, editor, next) {
  if (!editor) return;

  const { value } = editor;
  const { selection } = value;
  if (!getRangeItem(value) || !getSelectionInListItem(value)) {
    // 没有选中block或者选中的不是list
    return next();
  }

  // 单行操作
  if (
    selection.isCollapsed &&
    selection.anchor.isAtStartOfNode(getRangeItem(value).get(0))
  ) {
    // 光标没有选区，且锚点位于节点的开头
    if (event.shiftKey) {
      // shift+tab
      event.preventDefault();
      return decreaseItemDepth(editor);
    }
    // tab
    event.preventDefault();
    return increaseItemDepth(editor);
  }

  // 多行操作
  const blocks = value.document.getLeafBlocksAtRange(selection);
  if (!selection.isCollapsed && blocks.size > 0) {
    // 有选择且选择了多行
    if (event.shiftKey) {
      // shift+tab
      event.preventDefault();
      return decreaseItemDepth(editor);
    }
    // tab
    event.preventDefault();
    return increaseItemDepth(editor);
  }
  return next();
}

export default onTab;
