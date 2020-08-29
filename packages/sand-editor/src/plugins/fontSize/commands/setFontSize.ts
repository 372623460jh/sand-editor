import changeSelectionMark from './changeSelectionMark';
import { MARKS } from '../../../constants';

/**
 * 设置对齐方式
 * @param {*} editor 编辑器实例
 * @param {*} align 对齐方式
 */
export default function setFontSize(editor, dataValue) {
  if (!editor) return;
  // 改变mark的方法
  return changeSelectionMark(editor, MARKS.COMMON_MARK, dataValue);
}
