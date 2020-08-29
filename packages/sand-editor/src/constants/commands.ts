/**
 * 命令考虑和 execCommand() 保持一致，便于理解
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
 */
export const COMMANDS = {
  // marks
  BOLD: 'bold',
  ITALIC: 'italic',
  CODE: 'code',
  UNDERLINE: 'underline',
  STRIKE_THROUGH: 'strikeThrough',
  FONT_NAME: 'fontName',
  FONT_SIZE: 'fontSize',
  BACK_COLOR: 'backColor',
  FORE_COLOR: 'foreColor',

  // blocks
  // 插入水平线
  INSERT_HR: 'insertHorizontalRule',
  // 设置标题
  SET_HEADING: 'setHeading',
  // 块格式
  FORMAT_BLOCK: 'formatBlock',

  // inline
  INSERT_IMAGE: 'insertImage',

  // blockquote
  WRAP_IN_BLOCKQUOTE: 'wrapInBlockquote',
  UNWRAP_BLOCKQUOTE: 'unwrapBlockquote',

  // history
  REDO: 'redo',
  UNDO: 'undo',
};
