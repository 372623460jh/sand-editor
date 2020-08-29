import isParagraphBlock from '../utils/isParagraphBlock';

/**
 * 编辑器内点击事件
 * @param _
 * @param editor
 * @param next
 */
export default function onClick(_, editor, next) {
  const { value } = editor;

  const tableSelection = value.data.get('tableSelection');
  if (tableSelection) {
    return next();
  }

  // 取出格式化剪贴板中的数据
  const formatClipboard = value.data.get('formatClipboard');
  if (!formatClipboard || formatClipboard.trigger !== 'toolbar') {
    return next();
  }
  let { selection: range } = value;
  if (range.isCollapsed) {
    // 光标没有选中区域，选中整段落
    const { document } = value;
    // 获取选区的父段落节点
    const paragraph = document.getClosest(range.start.path, isParagraphBlock);
    // 选区选中整个段落节点
    range = range.moveToRangeOfNode(paragraph);
  }
  return editor.pasteFormatAtRange(range);
}
