import { toggleCommonMark } from '../../../utils/handleNoSelectionMark';

/**
 * 设置光标没有选区时的mark
 * @param {*} editor 编辑器实例
 * @param {*} markType mark类型
 * @param {*} dataValue svi data中的值
 * @param {*} selectType 模式
 */
export default function changeSelectionMark(editor, markType, dataValue) {
  if (!editor) return;
  return toggleCommonMark(editor, markType, 'fontSize', dataValue);
}
