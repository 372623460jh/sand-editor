import { isHotkey, isMatchSpaceHotkey } from '../../../utils';
import { HOTKEYS, MARKS } from '../../../constants';
import { createMdShortcutHandler } from '../../common/handlers';

const isMatchHotkey = isHotkey(HOTKEYS[MARKS.STRIKETHROUGH]);
const onSpace = createMdShortcutHandler({ type: MARKS.STRIKETHROUGH });

export function onKeyDown(event, editor, next) {
  if (isMatchHotkey(event)) {
    return editor.toggleStrikeMark();
  }

  if (isMatchSpaceHotkey(event)) {
    return onSpace(event, editor, next);
  }

  return next();
}
