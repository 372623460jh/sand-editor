import { isSelectionInHr } from '../../hr/utils';

/**
 * 有序列表是否允许使用
 */
export default function isDisabled(editor) {
  if (!editor) return false;
  const { value } = editor;
  // 判断选中区域的开始处是不是分割线，如果是，不允许使用list功能
  return isSelectionInHr(value);
}
