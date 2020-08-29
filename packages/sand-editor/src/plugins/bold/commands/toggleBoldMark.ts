import { toggleBaseMark } from '../../../utils/handleNoSelectionMark';

export default function toggleBoldMark(options, editor) {
  return toggleBaseMark(editor, options.type);
}
