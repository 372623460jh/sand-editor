import { BLOCKS, COMMANDS, MARKDOWN_SHORTCUTS } from '../../../constants';

const { BLOCKQUOTE } = BLOCKS;

/**
 * Markdown 快捷键：`>[space]` 转换为 blockquote
 * @param event
 * @param editor
 * @param next
 * @returns {*}
 */
export default function onSpace(event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  if (selection.isExpanded) {
    return next();
  }

  const { startBlock } = value;
  const { start } = selection;
  // eslint-disable-next-line max-len
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '');

  // TODO: Markdown 快捷键逻辑抽象
  if (chars === MARKDOWN_SHORTCUTS[BLOCKQUOTE]) {
    event.preventDefault();
    editor[COMMANDS.WRAP_IN_BLOCKQUOTE]();
    editor.moveFocusToStartOfNode(startBlock).delete();

    return editor;
  }

  return next();
}
