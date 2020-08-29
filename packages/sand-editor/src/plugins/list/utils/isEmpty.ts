// @ts-ignore
import slate from '@jianghe/slate';

/**
 * 判断是不是空节点,是text节点并且内容为空
 * @param {*} block 节点
 */
export default function isEmpty(block) {
  return block.nodes.every((node) => {
    // 是一个文本节点，并且文本为空
    return slate.Text.isText(node) && !node.text;
  });
}
