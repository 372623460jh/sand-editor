import { isHotkey } from '../../../utils';

export function createKeyDownHandler(options = {}) {
  // @ts-ignore
  const { hotkey } = options;
  const isMatchHotkey = isHotkey(hotkey);
  // const onSpace = createMdShortcutHandler({ type });

  return function onKeyDown(event, editor, next) {
    if (isMatchHotkey(event)) {
      return editor.toggleSupMark();
    }

    return next();
  };
}
