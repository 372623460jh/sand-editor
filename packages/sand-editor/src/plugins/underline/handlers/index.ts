import { isHotkey, isMatchSpaceHotkey } from '../../../utils';
import { HOTKEYS, MARKS } from '../../../constants';
import { createMdShortcutHandler } from '../../common/handlers';

const { UNDERLINE } = MARKS;
const isMatchHotkey = isHotkey(HOTKEYS[UNDERLINE]);
const onSpace = createMdShortcutHandler({ type: UNDERLINE });

export function onKeyDown(event, editor, next) {
  if (isMatchHotkey(event)) {
    return editor.toggleUnderlineMark();
  }

  if (isMatchSpaceHotkey(event)) {
    return onSpace(event, editor, next);
  }

  return next();
}
