import marks from '../../../constants/marks';

const { COMMON_MARK } = marks;

/**
 * 匹配获取选中区域首个text节点的common-mark中某个属性的值
 * （目前common-mark中有4个值，参考/marks/config/index）
 * @param {*} editor 编辑器实例
 */
export default function getSelectionCommonMarkData(editor, commonMarkDataKey) {
  if (!editor) return;
  const { value } = editor;

  // 第一个mark的字间距
  const marksArray = value.marks.size > 0 && value.marks.toArray();
  // commonMarkDataKey对应的值
  let styleValue = '';
  for (let n = 0; n < marksArray.length; n++) {
    const mark = marksArray[n];
    const { type = '' } = mark;
    if (type === COMMON_MARK) {
      styleValue = mark.data.get(commonMarkDataKey) || '';
      break;
    }
  }

  return styleValue;
}
