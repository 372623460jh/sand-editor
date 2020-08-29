import { getRangeItem, getListId, shortcutTypes } from '../utils';
import { toggleList } from '../commands';

/**
 * 按下空格handler 用于处理快捷键
 * @param {*} event 事件
 * @param {*} editor 编辑器实例
 * @param {*} next 下一步
 */
export default function onSpace(event, editor, next) {
  if (!editor) return;

  const { value } = editor;
  const { selection, startBlock } = value;

  // 按下空格时有选择范围
  if (value.isExpanded) return next();

  const currentItem = getRangeItem(value);
  // 当前block已经是一个list
  if (currentItem && currentItem.get(0).data.get('list')) return next();

  // 防止和标题快捷接冲突
  // TODO: 标题插件

  const startOffset = selection.start.offset;
  const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
  const types = shortcutTypes(chars);
  if (!types) return next();
  event.preventDefault();

  // 按下* - +再加空格时 markdown类型快捷键
  if (chars === '*' || chars === '-' || chars === '+') {
    const data = {
      list: {
        // @ts-ignore
        listId: getListId(value),
        level: 0,
        type: types,
      },
    };

    toggleList(editor, data);
    // eslint-disable-next-line no-useless-escape
  } else if (/^\d+[\.]$/.test(chars)) {
    // 以整数 + . + 空格 后续为ol 并且新起id
    // eslint-disable-next-line
    const data = {
      list: {
        listId: getListId(value, true), // 生成新id
        level: 0,
        type: types,
      },
    };
    toggleList(editor, data);
  } else {
    return editor;
  }

  return editor.moveFocusToStartOfNode(startBlock).delete();
}
