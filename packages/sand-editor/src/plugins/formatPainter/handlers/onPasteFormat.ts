/**
 * 处理键盘快捷键格式化格式
 * @param event
 * @param editor
 */
export default function onPasteFormat(event, editor, next) {
  const { value } = editor;

  const tableSelection = value.data.get('tableSelection');
  if (tableSelection) {
    return next();
  }

  const formatClipboard = value.data.get('formatClipboard');
  if (!formatClipboard || formatClipboard.trigger !== 'keyboard') {
    // 判断来源是不是快捷键
    return next();
  }
  event.preventDefault();
  const { selection, startBlock } = value;
  // 如果是光标没有选区默认选中当前block开头的第一个字符
  const targetRange = selection.isCollapsed
    ? selection.moveToRangeOfNode(startBlock)
    : selection;
  return editor.pasteFormatAtRange(targetRange);
}
