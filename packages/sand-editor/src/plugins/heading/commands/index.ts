import { BLOCKS } from '../../../constants';

const { PARAGRAPH } = BLOCKS;

export function setHeading(editor, { type = PARAGRAPH }) {
  return editor.setBlocks(type);
}
