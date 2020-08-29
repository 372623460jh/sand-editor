/**
 * 获取文字长度
 * @param options
 * @param editor
 * @returns {*}
 */
export default function getTextLength(options, editor) {
  const { value } = editor;
  const { document } = value;

  return document.text.length;
}
