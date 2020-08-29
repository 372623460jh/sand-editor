import { BLOCKS } from '../../../constants';

/**
 * 获取当前选中开始的节点或指定节点最近的段落父节点，没有返回null，有返回对应节点
 * @param {*} value svi
 * @param {*} alignBlock 指定节点
 */
function getClosestParagraph(value, alignBlock?) {
  if (!value) return;

  const { startBlock, document } = value;
  const block = alignBlock || startBlock;
  if (!startBlock) return null;

  if (
    block.type === BLOCKS.PARAGRAPH ||
    BLOCKS.HEADING_1 ||
    BLOCKS.HEADING_2 ||
    BLOCKS.HEADING_3 ||
    BLOCKS.HEADING_4 ||
    BLOCKS.HEADING_5 ||
    BLOCKS.HEADING_6
  ) {
    return block;
  }

  return document.getClosest(block.key, (node) => {
    const { type } = node;
    return type === BLOCKS.PARAGRAPH;
  });
}

export default getClosestParagraph;
