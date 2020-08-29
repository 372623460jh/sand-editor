/**
 * 插入表情指令
 * @param options
 * @param editor 编辑器实例
 * @param emoticon 表情对象
 */
export default function insertEmoticon(options, editor, emoticon) {
  const { text } = emoticon;
  return editor.insertText(text);
}
