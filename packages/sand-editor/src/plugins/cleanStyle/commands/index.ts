import { List } from 'immutable';
import BLOCKS from '../../../constants/blocks';

const { PARAGRAPH } = BLOCKS;

/**
 * 清除选区中的mark格式
 * @param {*} editor
 * @param {*} range
 */
export function clearMarksAtRange(editor, range) {
  const { value } = editor;
  const { document } = value;
  const marks = document.getMarksAtRange(range);
  // 清除选中区域mark
  if (!marks.isEmpty()) {
    marks.forEach((mark) => {
      editor.removeMark(mark);
    });
  }
  // 清除选中区域p标签的格式
  const ranges = [value.selection];
  // 获取选中的所有的最底层blocks
  const blocks = ranges.reduce(
    (list, blockRange) =>
      list.concat(value.document.getLeafBlocksAtRange(blockRange)),
    List()
  );
  blocks.forEach((block) => {
    const currentBlock = block;
    // 只有p标签才清除段落样式
    if (currentBlock.type === PARAGRAPH) {
      editor.setNodeByKey(currentBlock.key, {
        data: {},
      });
    }
  });
  return editor.focus();
}

/**
 * 清除格式
 * @param {*} editor
 */
export function clearStyles(editor) {
  const { value } = editor;
  const { selection } = value;
  const ranges = [selection];
  ranges.forEach((range) => clearMarksAtRange(editor, range));
  return editor;
}
