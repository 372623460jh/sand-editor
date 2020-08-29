import { List } from 'immutable';
import getRanges from '../../basic/utils/getRanges';

/**
 * 获取选区中的第一个字符,设置结束位置为开始+1,
 * 这样就能确保range选中区域只有一个字符
 * eg. 我是|阿萨德还是|奥深度 这样range就只包含阿这一个字符
 * @param range
 */
function getFirstCharRangeAfterStart(range) {
  const { start } = range;
  // 设置结束位置为开始+1
  return range.setEnd(start.setOffset(start.offset + 1));
}

/**
 * 判断没有选区时，光标位置是不是在block内
 * @param range
 * @param block
 */
function isCollapsedAtEndOfBlock(range, block) {
  if (range.isExpanded) {
    return false;
  }
  const { start: point } = range;
  return point.isAtEndOfNode(block);
}

/**
 * 允许格式刷处理的marks
 */
const copiableMarks = {
  // 背景色，字体大小，字体颜色
  'common-mark': true,
  // 粗体
  bold: true,
  // 斜体
  italic: true,
  // 中划线
  strikethrough: true,
  // 下划线
  underline: true,
};
function isCopiableMark(type) {
  return copiableMarks[type];
}

/**
 * 获取选中区域的格式，有选区获取mark，没选区获取block的类型，并设置到格式刷剪贴板中
 * @param editor
 * @param trigger 来源：toolbar
 * @param type 模式：single单击 multiple双击
 */
export default function copyFormat(editor, trigger, type = 'single') {
  const formatType = type;
  const { value } = editor;
  const ranges = getRanges(value);
  if (ranges.length === 0) {
    return editor;
  }

  const range = ranges[0];
  const { document } = value;

  // 获取选中区域的第一级block
  const currentBlock = document.getClosestBlock(range.start.key);

  /**
   * 处理文本格式，获取选中文本中的marks
   */
  let marksClipboard = List([]);
  if (range.isExpanded || !isCollapsedAtEndOfBlock(range, currentBlock)) {
    // 有选区或者没有选区时，光标位置不在在currentBlock内
    const firstCharRange = getFirstCharRangeAfterStart(range);
    // 获取range包含的mark
    marksClipboard = document
      .getMarksAtRange(firstCharRange)
      // eslint-disable-next-line
      .filter(({ type }) => isCopiableMark(type)); // 过滤掉支持的格式
  }
  return editor
    .withoutSaving(() => {
      // 将数据合并进editor.value.data中
      editor.mergeData({
        formatClipboard: {
          trigger,
          type: formatType,
          marksClipboard,
        },
      });
    })
    .focus();
}
