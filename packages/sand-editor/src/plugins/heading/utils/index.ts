import { BLOCKS } from '../../../constants';

const {
  PARAGRAPH,
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
} = BLOCKS;

export function getClosestParagraph(value: any, block?: any) {
  const { document, selection, startBlock } = value;
  let node = block || startBlock;

  if (!node) {
    if (!selection.start.key) {
      return null;
    }

    node = startBlock;
  }

  switch (node.type) {
    case PARAGRAPH:
    case HEADING_1:
    case HEADING_2:
    case HEADING_3:
    case HEADING_4:
    case HEADING_5:
    case HEADING_6:
      return node;
    default:
  }

  return document.getClosest(node.key, (blockItem) => {
    return blockItem.type === PARAGRAPH;
  });
}

export function isSelectionInHeading(value, type) {
  if (!value) {
    return false;
  }

  const block = getClosestParagraph(value);

  return block && block.type === type;
}
