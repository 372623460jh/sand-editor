import { isKeyHotkey } from 'is-hotkey';
import onCopyFormat from './onCopyFormat';
import onPasteFormat from './onPasteFormat';

const isCopyFormatHotKey = isKeyHotkey('mod+shift+c');
const isPasteFormatHotKey = isKeyHotkey('mod+shift+v');

export default function onKeyDown(event, editor, next) {
  if (isCopyFormatHotKey(event)) {
    return onCopyFormat(event, editor);
  }

  if (isPasteFormatHotKey(event)) {
    return onPasteFormat(event, editor, next);
  }

  return next();
}
