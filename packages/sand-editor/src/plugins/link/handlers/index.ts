import { isHotkey } from '../../../utils';
import { addLink } from '../commands';
import { HOTKEYS, INLINES } from '../../../constants';

const isMatchHotkey = isHotkey(HOTKEYS[INLINES.LINK]);

export function onKeyDown(event, editor, next) {
  const { value } = editor;
  const { selection } = value;
  const ranges = [selection];

  if (isMatchHotkey(event)) {
    return addLink(editor, ranges);
  }

  return next();
}
