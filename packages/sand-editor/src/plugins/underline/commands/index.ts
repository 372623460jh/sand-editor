import { toggleBaseMark } from '../../../utils/handleNoSelectionMark';
import { MARKS } from '../../../constants';

const { UNDERLINE } = MARKS;

/**
 * 切换下划线的指令
 * @param {*} editor
 * @param {*} ranges
 */
function toggleUnderlineMark(options, editor) {
  return toggleBaseMark(editor, UNDERLINE);
}

export { toggleUnderlineMark };
