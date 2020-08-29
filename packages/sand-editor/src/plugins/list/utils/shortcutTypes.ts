import { BLOCKS } from '../../../constants';

/**
 * 根据快捷键类型 区分list类型
 * @param {*} chars
 */
export default function shortcutTypes(chars) {
  // eslint-disable-next-line
  let typeChar = /^\d+[\.]$/.test(chars) ? '1.' : chars;
  switch (typeChar) {
    case '*':
    case '-':
    case '+':
      return BLOCKS.UL_LIST;
    case '1.':
      return BLOCKS.OL_LIST;
    default:
      return null;
  }
}
