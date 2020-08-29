import { List } from 'immutable';
import getClosestParagragh from '../../common/utils/getClosestParagragh';

/**
 * 设置对齐方式
 * @param {*} editor 编辑器实例
 * @param {*} align 对齐方式
 */
export default function setAlignment(editor, align) {
  if (!editor) return;
  const { value } = editor;
  const ranges = [value.selection];
  // 获取选中的所有的最底层blocks
  const blocks = ranges.reduce((list, range) => {
    return list.concat(value.document.getLeafBlocksAtRange(range));
  }, List());
  blocks.forEach((block) => {
    const currentAlignment = getClosestParagragh(value, block);
    // 设置data
    editor.setNodeByKey(currentAlignment.key, {
      data: {
        ...currentAlignment.data.toJS(),
        align,
      },
    });
  });
  return editor;
}
