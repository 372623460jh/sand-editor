import * as React from 'react';
import { MARKS } from '../../../constants';
import { getCommonStyle } from '../utils';
import { COMMON_MARK_STYLE_PROP_MAP } from '../config';

const { COMMON_MARK } = MARKS;
const COMMON_MARK_TAGS = {
  span: COMMON_MARK,
};

/**
 * 公共mark的序列化方序列化规则
 * @param {*} options
 */
// eslint-disable-next-line
export default function createRule(options) {
  return {
    deserialize(el, next) {
      const type = COMMON_MARK_TAGS[el.tagName.toLowerCase()];
      // span标签
      if (type) {
        const commonData: any = {};

        // 从元素中读取对应的样式值，目前处理了字体大小，背景颜色，字体颜色，字间距
        Object.keys(COMMON_MARK_STYLE_PROP_MAP).forEach((key) => {
          const styleAttr = COMMON_MARK_STYLE_PROP_MAP[key];
          const styleValue = el.style && el.style[styleAttr];
          if (styleValue) {
            commonData[key] = styleValue;
          }
        });

        // 有属性
        if (Object.keys(commonData).length > 0) {
          return {
            object: 'text',
            text: el.innerText || '',
            marks: [
              {
                object: 'mark',
                type,
                data: commonData,
              },
            ],
          };
        }
        next();
      }
    },

    serialize(obj, children) {
      if (obj.object === 'mark' && obj.type === COMMON_MARK) {
        return <span style={getCommonStyle(obj)}>{children}</span>;
      }

      // 兼容旧字体大小mark数据格式
      if (obj.object === 'mark' && obj.type === 'font-size') {
        return <span>{children}</span>;
      }
    },
  };
}
