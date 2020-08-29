import { BLOCKS } from '../../../constants';

const { BLOCKQUOTE } = BLOCKS;

export function wrapInBlockquote(editor) {
  return editor.wrapBlock(BLOCKS.BLOCKQUOTE).focus();
}

export function unwrapBlockquote(editor) {
  return editor.unwrapBlock(BLOCKQUOTE).focus();
}
