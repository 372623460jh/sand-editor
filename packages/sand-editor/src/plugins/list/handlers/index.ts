import { isHotkey } from '../../../utils';
import onTab from './onTab';
import onBackspace from './onBackspace';
import onEnter from './onEnter';
import onSpace from './onSpace';

const isBackspaceHotKey = isHotkey('backspace');
const isDeleteHotKey = isHotkey('delete');
const isEnterHotKey = isHotkey('enter');
const isSpaceHotKey = isHotkey('space');
const isTabHotKey = isHotkey('shift?+tab');
const isBackwardHotKey = isHotkey('left');
const isForwardHotKey = isHotkey('right');

export function onKeyDown(event, editor, next) {
  if (!editor) return;
  const { value } = editor;

  // 回车
  if (isEnterHotKey(event)) {
    return onEnter(event, editor, next);
  }

  // tab
  if (isTabHotKey(event)) {
    return onTab(event, editor, next);
  }

  // 回退
  if (isBackspaceHotKey(event) || isDeleteHotKey(event)) {
    return onBackspace(event, editor, next);
  }

  // 空格
  if (isSpaceHotKey(event)) {
    return onSpace(event, editor, next);
  }

  // 在段首时回退不使用浏览器默认行为，防止list要回退多次才能到达上一行的情况
  if (isBackwardHotKey(event)) {
    const { selection } = value;
    const startOffset = selection.start.offset;
    if (selection.isCollapsed && startOffset === 0) {
      event.preventDefault();
      return editor.moveBackward();
    }
  }

  if (isForwardHotKey(event)) {
    const { selection, startBlock } = value;
    if (selection.isCollapsed && selection.start.isAtEndOfNode(startBlock)) {
      // 没有选中并且锚点在节点之后
      event.preventDefault();
      return editor.moveForward();
    }
  }

  return next();
}
