/**
 * Map of all block types. Blocks can contain inlines or blocks.
 */
export default {
  DOCUMENT: 'document',
  // TEXT: 'unstyled',

  // Classic blocks
  CODE_BLOCK: 'code-block',
  CODE_LINE: 'code-line',
  BLOCKQUOTE: 'blockquote',
  PARAGRAPH: 'paragraph',
  // FOOTNOTE: 'footnote',
  // HTML: 'html_block',
  HR: 'hr',

  // Headings
  HEADING_1: 'heading-1',
  HEADING_2: 'heading-2',
  HEADING_3: 'heading-3',
  HEADING_4: 'heading-4',
  HEADING_5: 'heading-5',
  HEADING_6: 'heading-6',

  // Table
  TABLE: 'table',
  TABLE_ROW: 'table-row',
  TABLE_CELL: 'table-cell',

  // Lists
  OL_LIST: 'ordered-list',
  UL_LIST: 'unordered-list',
  LIST_ITEM: 'list-item',

  // alignment
  ALIGN_LEFT: 'align-left',
  ALIGN_CENTER: 'align-center',
  ALIGN_RIGHT: 'align-right',
  ALIGN_JUSTIFY: 'align-justify',

  // Default block
  DEFAULT: 'paragraph',

  // Special
  IMAGE: 'image',
  VIDEO: 'video',

  // embed
  IFRAME: 'iframe',

  // 段前距
  PARAGRAPH_SPACING_TOP: 'paragraph-spacing-top',
  // 段后距
  PARAGRAPH_SPACING_BOTTOM: 'paragraph-spacing-bottom',
  // 行间距
  ROW_SPACING: 'row-spacing',
  // 两端缩进
  PARAGRAPH_BOTH_ENDS_PADDING: 'paragraph-both-ends-padding',
};
