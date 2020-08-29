import { BLOCKS } from '../../../constants';

// eslint-disable-next-line no-unused-vars
export function insertHr(editor, options) {
  const { value } = editor;
  const { focusBlock } = value;

  editor
    .insertBlock({ type: BLOCKS.HR })
    .insertBlock(BLOCKS.PARAGRAPH)
    .moveToStartOfNextBlock()
    .focus();

  // 插入前是空行则删除

  if (focusBlock.getText() === '') {
    editor.removeNodeByKey(focusBlock.key);
  }

  return editor;
}
