import { isHotkey, isMatchSpaceHotkey } from '../../../utils';
import { HOTKEYS, MARKS } from '../../../constants';
import { createMdShortcutHandler } from '../../common/handlers';

const isMatchHotkey = isHotkey(HOTKEYS[MARKS.ITALIC]);
const onSpace = createMdShortcutHandler({ type: MARKS.ITALIC });

export function onKeyDown(event, editor, next) {
  if (isMatchHotkey(event)) {
    return editor.toggleItalicMark();
  }

  if (isMatchSpaceHotkey(event)) {
    return onSpace(event, editor, next);
  }

  return next();
}
