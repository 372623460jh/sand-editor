import { toggleBaseMark } from '../../../utils/handleNoSelectionMark';
import { MARKS } from '../../../constants';

const { STRIKETHROUGH } = MARKS;

/**
 * 切换中划线的指令
 */
function toggleStrikeMark(options, editor) {
  return toggleBaseMark(editor, STRIKETHROUGH);
}

export { toggleStrikeMark };
