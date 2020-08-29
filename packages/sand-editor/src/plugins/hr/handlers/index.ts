import { isHotkey } from '../../../utils';
import { BLOCKS, COMMANDS } from '../../../constants';

const isMatchEnterKey = isHotkey('enter');
const isMatchBackspaceKey = isHotkey('backspace');

export function onKeyDown(event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  // 退格操作
  if (isMatchBackspaceKey(event)) {
    // 是否有选中
    if (selection.isExpanded) {
      return next();
    }

    // 非行首
    if (selection.start.offset > 0) {
      return next();
    }

    const { startBlock } = value;

    if (startBlock.type === BLOCKS.HR) {
      // 解决行首插入的 hr 不能删除问题
      event.preventDefault();
      return editor
        .insertBlock('paragraph')
        .removeNodeByKey(startBlock.key)
        .focus();
    }
  }

  // ---[enter] 转换成 hr
  if (isMatchEnterKey(event)) {
    if (selection.isExpanded) {
      return next();
    }

    const { startBlock } = value;
    const chars = startBlock.text
      .slice(0, selection.start.offset)
      .replace(/\s*/g, '');

    if (chars === '---') {
      event.preventDefault();
      editor.moveFocusToStartOfBlock().delete();
      editor[COMMANDS.INSERT_HR]();

      return editor;
    }
  }

  return next();
}
