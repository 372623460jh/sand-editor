import { getCurrentBlockquote } from '../utils';
import { unwrapBlockquote } from '../commands';

/**
 * Enter on an empty block inside a blockquote exit the blockquote.
 * @param event
 * @param editor
 * @param next
 * @returns {*}
 */
export default function onEnter(event, editor, next) {
  const { value } = editor;
  const { startBlock } = value;

  // @ts-ignore
  if (!getCurrentBlockquote(value)) {
    return next();
  }

  if (startBlock.text.length !== 0) {
    return next();
  }

  // block 为空，退出引用
  event.preventDefault();
  return unwrapBlockquote(editor);
}
