import { IS_MAC } from '@jianghe/slate-dev-environment';
import BLOCKS from './blocks';
import INLINES from './inlines';
import MARKS from './marks';
import { COMMANDS } from './commands';

// 快捷键
export const HOTKEYS = {
  // 重做
  [COMMANDS.REDO]: IS_MAC ? 'mod+shift+z' : 'ctrl+y',
  // 撤销
  [COMMANDS.UNDO]: 'mod+z',

  // marks
  [MARKS.BOLD]: 'mod+b',
  [MARKS.ITALIC]: 'mod+i',
  [MARKS.UNDERLINE]: 'mod+u',
  [MARKS.STRIKETHROUGH]: 'mod+shift+x',
  // 上标
  [MARKS.SUP]: 'mod+.',
  // 下标
  [MARKS.SUB]: 'mod+,',

  // 链接
  [INLINES.LINK]: 'mod+k',
};

// Markdown 快捷键
export const MARKDOWN_SHORTCUTS = {
  // marks
  // **、__
  [MARKS.BOLD]: '**',
  // */_
  [MARKS.ITALIC]: '_',
  [MARKS.STRIKETHROUGH]: '~~',
  [MARKS.CODE]: '`',

  // blocks
  [BLOCKS.LIST_ITEM]: ['*', '-', '+'],
  [BLOCKS.BLOCKQUOTE]: '>',
  [BLOCKS.HEADING_1]: '#',
  [BLOCKS.HEADING_2]: '##',
  [BLOCKS.HEADING_3]: '###',
  [BLOCKS.HEADING_4]: '####',
  [BLOCKS.HEADING_5]: '#####',
  [BLOCKS.HEADING_6]: '######',
  [BLOCKS.HR]: '---',
};
