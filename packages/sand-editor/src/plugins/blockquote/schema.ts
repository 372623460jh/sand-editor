import { Block } from '@jianghe/slate';
import { BLOCKS, SLATE_OBJECT_TYPES } from '../../constants';
import {
  CHILD_OBJECT_INVALID,
  CHILD_TYPE_INVALID,
} from '../../constants/schema-violations';

const { PARAGRAPH } = BLOCKS;

/**
 *  Ensures that blockquote always contain blocks.
 */
// eslint-disable-next-line
function containBlocks(editor, error) {
  const toWrap = error.node.nodes.filter((n) => n.object !== 'block');

  if (toWrap.isEmpty()) {
    return undefined;
  }

  // Wrap text/inline nodes in default block
  const wrapper = Block.create({
    type: PARAGRAPH,
    nodes: [],
  });

  // insertNodeByKey(key: String, index: Number, node: Node) => Editor
  editor.insertNodeByKey(
    error.node.key,
    0,
    wrapper,
    // Be careful of Slate's core schema removing inlines or blocks when
    // a block contains a mix of them.
    { normalize: false }
  );

  toWrap.forEach((child, index) => {
    const isLast = index === toWrap.size - 1;
    editor.moveNodeByKey(child.key, wrapper.key, index, {
      normalize: isLast,
    });
  });

  return editor;
}

/**
 * blockquote schema
 *
 * - 暂时只允许段落为子 block
 */
function createSchema({ type = BLOCKS.BLOCKQUOTE } = {}) {
  return {
    blocks: {
      [type]: {
        nodes: [
          {
            match: {
              type: PARAGRAPH,
              object: SLATE_OBJECT_TYPES.BLOCK,
            },
          },
        ],
        normalize(editor, error) {
          switch (error.code) {
            case CHILD_OBJECT_INVALID:
              editor.wrapBlockByKey(error.child.key, PARAGRAPH);
              // containBlocks(editor, error);
              break;
            case CHILD_TYPE_INVALID:
              // 将非 paragraph 转换成 paragraph
              editor.setNodeByKey(error.child.key, PARAGRAPH);
              break;
            default:
          }
        },
      },
    },
  };
}

// 参数为预留接口，暂未使用
export default createSchema();
