import { isSelectionInHeading } from '../utils';
import { BLOCKS } from '../../../constants';

const {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
  PARAGRAPH,
} = BLOCKS;

/**
 * 标题 enter 时退出标题类型
 * @param options
 * @param event
 * @param editor
 * @param next
 * @returns {*}
 */
export default function onEnter(options, event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  // 判断光标是否在标题内
  const isInHeading = [
    HEADING_1,
    HEADING_2,
    HEADING_3,
    HEADING_4,
    HEADING_5,
    HEADING_6,
  ].some((heading) => isSelectionInHeading(value, heading));

  if (!isInHeading) {
    return next();
  }

  event.preventDefault();

  // 光标位于行首
  const isEnterAtStartOfLine =
    selection.isCollapsed && selection.start.offset === 0;

  if (isEnterAtStartOfLine) {
    return editor.insertBlock(PARAGRAPH).moveToStartOfNextText();
  }

  return editor
    .splitBlock()
    .setBlocks({
      type: PARAGRAPH,
      data: {},
    })
    .focus();
}
