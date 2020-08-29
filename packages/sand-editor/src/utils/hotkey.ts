import { isHotkey } from 'is-hotkey';
import { IS_MAC } from './env';

export { isHotkey };

export const MOD = IS_MAC ? '⌘' : 'Ctrl';

/**
 * 获取快捷键描述
 * @param hotkey
 * @returns {string}
 */
export function getHotkeyDesc(hotkey) {
  if (!hotkey) {
    return;
  }

  return hotkey.toUpperCase().replace('MOD', MOD);
}

export const isMatchSpaceHotkey = isHotkey('space');
