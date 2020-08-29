import * as React from 'react';
import { BLOCKS } from '../../../constants';
import { getCommonStyle } from '../utils';

const { PARAGRAPH } = BLOCKS;
const PARAGRAPH_TAGS = {
  p: PARAGRAPH,
};

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line
export function createHtmlRule(options) {
  return {
    // eslint-disable-next-line
    deserialize: (el, next) => {
      const type = PARAGRAPH_TAGS[el.tagName.toLowerCase()];
      if (type) {
        const data: any = {};
        // 对齐方式反序列化
        const alignment = el && el.style && el.style.textAlign;
        if (alignment) {
          // 对齐组件
          data.align = alignment;
        }
        // 端间距反序列化
        const psPaddingTop = el && el.style && el.style.paddingTop;
        const psPaddingBottom = el && el.style && el.style.paddingBottom;
        const paragraphSpacing: any = {};
        if (psPaddingTop) {
          // 段前
          paragraphSpacing.top = psPaddingTop;
        }
        if (psPaddingBottom) {
          // 段后
          paragraphSpacing.bottom = psPaddingBottom;
        }
        if (psPaddingTop || psPaddingBottom) {
          data.paragraphSpacing = paragraphSpacing;
        }
        // 行间距
        const rslineHeight = el && el.style && el.style.lineHeight;
        if (rslineHeight) {
          data.rowSpacing = rslineHeight;
        }
        // 两端缩进
        const psPaddingLeft = el && el.style && el.style.paddingLeft;
        const psPaddingRight = el && el.style && el.style.paddingRight;
        // 两端缩进 默认取左边值
        if (psPaddingLeft && psPaddingLeft === psPaddingRight) {
          data.paragraphBothEndsPadding = psPaddingLeft;
        }
        return {
          object: 'block',
          type,
          data,
          nodes: next(el.childNodes),
        };
      }
      if (el.nodeType === 3) {
        // nodeType === 3 是文本节点
        return {
          object: 'text',
          text: el.nodeValue || '', // 文本内容
        };
      }
    },
    // eslint-disable-next-line
    serialize: (obj, children) => {
      if (obj.object === 'block' && obj.type === PARAGRAPH) {
        return (
          <p style={getCommonStyle(obj)} {...obj.data.get('attrs')}>
            {children}
          </p>
        );
      }
      if (obj.object === 'string') {
        return obj.text;
      }
    },
  };
}
