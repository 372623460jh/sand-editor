import { isHotkey } from '../../../utils';
import getClosestParagraph from '../../common/utils/getClosestParagragh';
import setAlignment from '../commands/setAlignment';

// 回退
const isDeleteHotKey = isHotkey('backspace');

export function onKeyDown(event, editor, next) {
  if (!editor) return;
  const { value } = editor;

  if (isDeleteHotKey(event)) {
    const currentParagraph = getClosestParagraph(value);
    if (!currentParagraph || currentParagraph.data.get('align') === 'left') {
      return next();
    }
    const { startBlock, selection } = value;

    // 未选中并且在行首
    const isDeleteAtFirstChar =
      selection.isCollapsed &&
      selection.anchor.isAtStartOfNode(currentParagraph);
    const isNewLineFirstChar =
      selection.isCollapsed && selection.anchor.isAtStartOfNode(startBlock);
    if (!isDeleteAtFirstChar && !isNewLineFirstChar) return next();

    if (isDeleteAtFirstChar) {
      // 在行首backspace/delete撤销对齐
      return setAlignment(editor, 'left');
    }
  }

  return next();
}
