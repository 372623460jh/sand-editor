import { isHotkey, isMatchSpaceHotkey } from '../../../utils';
import { createMdShortcutHandler } from '../../common/handlers';

export function createKeyDownHandler(options = {}) {
  // @ts-ignore
  const { type, hotkey } = options;
  const isMatchHotkey = isHotkey(hotkey);
  const onSpace = createMdShortcutHandler({ type });

  return function onKeyDown(event, editor, next) {
    if (isMatchHotkey(event)) {
      return editor.toggleBoldMark();
    }

    if (isMatchSpaceHotkey(event)) {
      return onSpace(event, editor, next);
    }

    return next();
  };
}
