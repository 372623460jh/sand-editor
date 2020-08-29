import * as React from 'react';
import { BLOCKS } from '../../../constants';
import { getListId } from '../utils';

const { OL_LIST, LIST_ITEM, UL_LIST } = BLOCKS;
const BLOCK_TAGS = {
  ol: OL_LIST,
  ul: UL_LIST,
};

const LI_TAGS = {
  li: LIST_ITEM,
};

// li外部包裹的标签
let outBlock;

// 生成listid的方法
let listId = '';
function getCommonListId() {
  if (!listId) {
    listId = getListId(null, true);
  }
  return listId;
}

/**
 * 序列化、反序列化规则
 * @param options 预留的参数
 */
// eslint-disable-next-line no-unused-vars
export function createRule(options) {
  return {
    deserialize(el, next) {
      const block = BLOCK_TAGS[el.tagName.toLowerCase()];
      const li = LI_TAGS[el.tagName.toLowerCase()];
      if (block) {
        outBlock = block;
        return {
          object: 'block',
          type: BLOCKS.PARAGRAPH,
          nodes: next(el.childNodes),
        };
      }
      if (li) {
        // 生成id
        return {
          object: 'block',
          type: outBlock,
          data: {
            list: {
              level: 0,
              listId: getCommonListId(),
              type: outBlock,
            },
          },
          nodes: next(el.childNodes),
        };
      }
      if (el.nodeType === 3) {
        // nodeType === 3是文本节点
        return {
          object: 'text',
          text: el.nodeValue || '', // 文本内容
          nodes: next(el.childNodes), // 子节点
        };
      }
    },
    serialize(obj, children) {
      if (obj.object === 'block' && obj.type === BLOCKS.LIST_ITEM) {
        const list = obj.data.get('list');
        if (list.type === BLOCKS.OL_LIST) {
          return (
            <ol data-level={list.level}>
              <li>{children}</li>
            </ol>
          );
        }
        if (list.type === BLOCKS.UL_LIST) {
          return (
            <ul data-level={list.level}>
              <li>{children}</li>
            </ul>
          );
        }
      }
      if (obj.object === 'string') {
        return obj.text;
      }
    },
  };
}
