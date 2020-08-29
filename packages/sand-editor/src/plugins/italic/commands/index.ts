import { toggleBaseMark } from '../../../utils/handleNoSelectionMark';
import { MARKS } from '../../../constants';

export function toggleItalicMark(options, editor) {
  return toggleBaseMark(editor, MARKS.ITALIC);
}
