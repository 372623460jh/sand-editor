/**
 * 获取公共样式
 * @param {*} node slate node
 */
export function getCommonStyle(node) {
  const { data } = node;

  // 对齐
  const alignment = data.get('align');
  // 段距
  const paragraphSpacing = data.get('paragraphSpacing');
  // 行间距
  const rowSpacing = data.get('rowSpacing');

  // p 标签公共样式
  const paragraphStyle: any = {};

  // 是否有对齐方式
  if (alignment) {
    paragraphStyle.textAlign = alignment;
  }

  // 是否有段距
  if (paragraphSpacing) {
    const { top } = paragraphSpacing;
    const { bottom } = paragraphSpacing;
    if (top) {
      paragraphStyle.paddingTop = top;
    }
    if (bottom) {
      paragraphStyle.paddingBottom = bottom;
    }
  }

  // 是否有行间距
  if (rowSpacing) {
    paragraphStyle.lineHeight = rowSpacing;
  }

  // 两端缩进
  const paragraphBothEndsPadding = data.get('paragraphBothEndsPadding');
  if (paragraphBothEndsPadding) {
    paragraphStyle.paddingLeft = `${paragraphBothEndsPadding}`;
    paragraphStyle.paddingRight = `${paragraphBothEndsPadding}`;
  }

  return paragraphStyle;
}
