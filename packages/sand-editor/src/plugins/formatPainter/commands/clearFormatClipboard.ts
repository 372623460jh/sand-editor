/**
 * 清除格式化剪贴板中的格式数据
 * @param editor
 */
export default function clearFormatClipboard(editor) {
  return editor.withoutSaving(() => {
    editor.mergeData({
      formatClipboard: null,
    });
  });
}
