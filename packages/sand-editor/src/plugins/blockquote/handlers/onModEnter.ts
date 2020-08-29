import { Block, Text } from '@jianghe/slate';
import { getCurrentBlockquote } from '../utils';
import { BLOCKS } from '../../../constants';

/**
 * Mod+Enter
 * Exit the current block and inserts a paragraph after it
 */
export default function onModEnter(event, editor, next) {
  const { value } = editor;
  const { document } = value;
  const blockquote = getCurrentBlockquote(value);

  if (!blockquote) {
    return next();
  }

  event.preventDefault();

  const exitBlock = Block.create({
    type: BLOCKS.PARAGRAPH,
    nodes: [Text.create('')],
  });

  const parent = document.getParent(blockquote.key);
  const index = parent.nodes.findIndex((child) => child.key === blockquote.key);

  // insertNodeByKey(key: String, index: Number, node: Node) => Editor
  return editor
    .insertNodeByKey(parent.key, index + 1, exitBlock)
    .moveToStartOfNode(exitBlock);
}
