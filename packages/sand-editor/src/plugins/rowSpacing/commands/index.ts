import { List } from 'immutable';
import BLOCKS from '../../../constants/blocks';

const { PARAGRAPH } = BLOCKS;

/**
 * 设置段间距
 * @param {*} editor 编辑器实例
 */
export function setRowSpacing(option, editor, rsSize) {
  if (!editor) return null;
  const { value } = editor;
  const ranges = [value.selection];
  // 获取选中的所有的最底层blocks
  const blocks = ranges.reduce(
    (list, range) => list.concat(value.document.getLeafBlocksAtRange(range)),
    List()
  );
  blocks.forEach((block) => {
    const currentBlock = block;
    // 只有p标签才可以加段前段后
    if (currentBlock.type === PARAGRAPH) {
      // 设置data
      editor.setNodeByKey(currentBlock.key, {
        data: {
          ...currentBlock.data.toJS(),
          rowSpacing: rsSize,
        },
      });
    }
  });
  return editor.focus();
}

/**
 * 读取当前选中区间第一个p标签的行间距
 * @param {*} editor 编辑器实例
 */
export function getSelectRowSpacing(editor) {
  if (!editor) return '';
  const { value } = editor;
  const { selection, document } = value;
  // 是否是p标签
  const paragraph = document.getClosest(
    selection.start.key,
    (node) => node.type === 'paragraph'
  );
  const rowSpacing = paragraph ? paragraph.data.get('rowSpacing') || '' : '';
  return rowSpacing;
}
