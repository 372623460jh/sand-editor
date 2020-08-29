import { List } from 'immutable';
import BLOCKS from '../../../constants/blocks';

const { PARAGRAPH_SPACING_BOTTOM, PARAGRAPH_SPACING_TOP, PARAGRAPH } = BLOCKS;

/**
 * 设置段间距
 * @param {*} editor 编辑器实例
 * @param {*} align 对齐方式
 */
export function setParagraphSpacing(option, editor, psSize, psType) {
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
      const paragraphSpacing = {
        ...(currentBlock.data.toJS().paragraphSpacing || {}),
      };
      if (psType === PARAGRAPH_SPACING_BOTTOM) {
        // 段后距
        paragraphSpacing.bottom = psSize;
      }
      if (psType === PARAGRAPH_SPACING_TOP) {
        // 段前距
        paragraphSpacing.top = psSize;
      }
      // 设置data
      editor.setNodeByKey(currentBlock.key, {
        data: {
          ...currentBlock.data.toJS(),
          paragraphSpacing,
        },
      });
    }
  });
  return editor.focus();
}

/**
 * 读取当前选中区间第一个p标签的段前段后距
 * @param {*} editor 编辑器实例
 * @param {*} align 对齐方式
 */
export function getSelectParagraphSpacing(editor) {
  if (!editor) return {};
  const { value } = editor;
  const { selection, document } = value;
  // 是否是p标签
  const paragraph = document.getClosest(
    selection.start.key,
    (node) => node.type === 'paragraph'
  );
  const paragraphSpacing = paragraph
    ? paragraph.data.get('paragraphSpacing') || {}
    : {};
  return paragraphSpacing;
}
