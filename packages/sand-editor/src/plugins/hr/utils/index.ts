import { BLOCKS } from '../../../constants';

export function isSelectionInHr(value) {
  if (!value) {
    return false;
  }

  const { selection, document } = value;
  // https://docs.slatejs.org/slate-core/node#getclosest
  const closestParent = document.getClosest(selection.start.key, (node) => {
    return node.type === BLOCKS.HR;
  });

  return selection.isCollapsed && !!closestParent;
}
