import { getCurrentBlockquote } from '../utils';
import { unwrapBlockquote } from '../commands';

/**
 * User pressed Delete in an editor:
 * Unwrap the blockquote if at the start of the inner block.
 */
export default function onBackspace(event, editor, next) {
  const { value } = editor;
  const { selection } = value;
  const { isCollapsed } = selection;
  const startOffset = selection.start.offset;
  // @ts-ignore
  const blockquote = getCurrentBlockquote(value);

  if (!blockquote || !isCollapsed) {
    return next();
  }

  // 包含多个子节点
  if (blockquote.nodes.size !== 1) {
    return next();
  }

  // TODO: 在第一个子节点的首行时也退出
  if (startOffset !== 0) {
    return next();
  }

  // block 为空，且只有一个子节点，取消引用格式
  event.preventDefault();
  return unwrapBlockquote(editor);
}
