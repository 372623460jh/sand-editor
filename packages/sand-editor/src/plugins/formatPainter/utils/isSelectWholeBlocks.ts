/**
 * 光标处于一个空白block中
 * @param value
 */
export default function isSelectWholeBlocks(value) {
  const { selection, startBlock, endBlock } = value;
  const { start, end } = selection;
  return start.isAtStartOfNode(startBlock) && end.isAtEndOfNode(endBlock);
}
