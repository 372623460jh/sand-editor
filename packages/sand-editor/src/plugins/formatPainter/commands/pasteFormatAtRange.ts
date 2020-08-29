import clearFormatClipboard from './clearFormatClipboard';

/**
 * 清除选区中的mark样式
 * @param editor 编辑器实例
 * @param range 区间
 */
function clearMarksAtRange(editor, range) {
  const { value } = editor;
  const { document } = value;
  // 取出选区里的所有marks
  const marks = document.getMarksAtRange(range);
  if (!marks.isEmpty()) {
    // 不为空，移除该清除范围内的所有mark
    marks.forEach((mark) => {
      if (range.isCollapsed) {
        editor.removeMark(mark);
      } else {
        editor.removeMarkAtRange(range, mark);
      }
    });
  }
  return editor;
}

/**
 * 格式化整个选区
 * @param editor 编辑器对象
 * @param range 选区
 */
export default function pasteFormatAtRange(editor, range) {
  const { value } = editor;
  const formatClipboard = value.data.get('formatClipboard');
  if (!formatClipboard) {
    return editor;
  }
  // 清除选区中的mark
  clearMarksAtRange(editor, range);
  // 取出需要添加的mark
  const marks = formatClipboard.marksClipboard;

  /**
   * 之所以不全走addMarksAtRange是因为这个api有bug
   */
  const { selection } = value;
  if (selection.isCollapsed) {
    // 光标没有选区走官方api
    editor.addMarksAtRange(range, marks);
  } else {
    // 没有选区走addMarks
    const marksArr = [];
    marks.forEach((mark) => {
      marksArr.push(mark);
    });
    editor.addMarks(marksArr);
  }

  // 双击的不清除格式刷剪贴板
  if (formatClipboard.type !== 'multiple') {
    clearFormatClipboard(editor);
  }

  return editor.focus();
}
