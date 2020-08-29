import { BLOCKS, COMMANDS, MARKDOWN_SHORTCUTS } from '../../../constants';
import { invert } from '../../../utils';

const {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
} = BLOCKS;

const HEADING_SHORTCUTS = {
  [HEADING_1]: MARKDOWN_SHORTCUTS[HEADING_1],
  [HEADING_2]: MARKDOWN_SHORTCUTS[HEADING_2],
  [HEADING_3]: MARKDOWN_SHORTCUTS[HEADING_3],
  [HEADING_4]: MARKDOWN_SHORTCUTS[HEADING_4],
  [HEADING_5]: MARKDOWN_SHORTCUTS[HEADING_5],
  [HEADING_6]: MARKDOWN_SHORTCUTS[HEADING_6],
};

const HEADING_SHORTCUT_TYPE_MAP = invert(HEADING_SHORTCUTS);

/**
 * Markdown 快捷键：`#{1,6}[space]` 转换为标题
 * @param options
 * @param event
 * @param editor
 * @param next
 * @returns {*}
 */
export default function onSpace(options, event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  if (selection.isExpanded) {
    return next();
  }

  const { startBlock } = value;
  const { start } = selection;
  // eslint-disable-next-line max-len
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, '');
  const headingType = HEADING_SHORTCUT_TYPE_MAP[chars];
  const { enabledHeadings = [] } = options || {};

  if (headingType && enabledHeadings.indexOf(headingType) > -1) {
    event.preventDefault();
    editor[COMMANDS.SET_HEADING]({ type: headingType });
    editor.moveFocusToStartOfNode(startBlock).delete();

    return editor;
  }

  return next();
}
