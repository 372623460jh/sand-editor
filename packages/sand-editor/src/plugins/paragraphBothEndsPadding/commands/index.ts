import { List } from 'immutable';
import BLOCKS from '../../../constants/blocks';

const { PARAGRAPH } = BLOCKS;

/**
 * 设置两端缩进
 * @param {*} editor 编辑器实例
 */
export function setParagraphBothEndsPadding(option, editor, psSize, psType) {
  if (!editor) return null;
  const { value } = editor;
  const ranges = [value.selection];
  // 获取选中的所有的最底层 blocks
  const blocks = ranges.reduce(
    (list, range) => list.concat(value.document.getLeafBlocksAtRange(range)),
    List()
  );
  blocks.forEach((block) => {
    const currentBlock = block;
    if (currentBlock.type === PARAGRAPH) {
      editor.setNodeByKey(currentBlock.key, {
        data: {
          ...currentBlock.data.toJS(),
          paragraphBothEndsPadding: psSize,
        },
      });
    }
  });
  return editor.focus();
}

/**
 * 读取当前选中区间第一个 p 标签的双端缩进
 * @param {*} editor 编辑器实例
 */
export function getSelectParagraphBothEndsPadding(editor) {
  if (!editor) return {};
  const { value } = editor;
  const { selection, document } = value;
  const paragraph = document.getClosest(
    selection.start.key,
    (node) => node.type === 'paragraph'
  );
  return paragraph ? paragraph.data.get('paragraphBothEndsPadding') : '';
}
