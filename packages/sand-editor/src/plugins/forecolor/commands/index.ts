import { MARKS } from '../../../constants';
import { toggleCommonMark } from '../../../utils/handleNoSelectionMark';

const { COMMON_MARK } = MARKS;

export function foreColor(editor, options = {}) {
  if (!editor) return;
  // @ts-ignore
  const { color } = options;
  return toggleCommonMark(editor, COMMON_MARK, 'foreColor', color);
}
