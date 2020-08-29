import { BLOCKS } from '../../../constants';

const { BLOCKQUOTE } = BLOCKS;

/**
 * Return the current blockquote, from current selection or from a node.
 */
export function getCurrentBlockquote(value: any, block?: any) {
  const { document, selection, startBlock } = value;
  let node = block;

  if (!node) {
    if (!selection.start.key) {
      return null;
    }
    node = startBlock;
  }

  const parent = document.getParent(node.key);
  return parent && parent.type === BLOCKQUOTE ? parent : null;
}

export function isSelectionInBlockquote(value) {
  if (!value) {
    return false;
  }

  return Boolean(getCurrentBlockquote(value));
}
