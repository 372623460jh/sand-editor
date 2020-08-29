import { COMMON_MARK_STYLE_PROP_MAP } from '../config';

/**
 * 根据commonmark获取style
 * @param {*} mark
 */
export default function getCommonStyle(mark) {
  // 公共样式
  const commonStyle = {};

  Object.keys(COMMON_MARK_STYLE_PROP_MAP).forEach((dataKey) => {
    const value = mark.data.get(dataKey);
    const styleKey = COMMON_MARK_STYLE_PROP_MAP[dataKey];

    // TODO: 考虑清空的场景
    if (value) {
      commonStyle[styleKey] = value;
    }
  });

  return commonStyle;
}
