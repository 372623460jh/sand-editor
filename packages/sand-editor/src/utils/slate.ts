import { Value } from '@jianghe/slate';
import { DEFAULT_VALUE } from '../constants';

/**
 * svj => svi
 * @param valueJSON
 */
export function createValue(valueJSON) {
  return Value.fromJSON(valueJSON);
}

/**
 * 创建默认svi
 */
export function createDefaultValue() {
  return createValue(DEFAULT_VALUE);
}

/**
 * 选中处是否包含指定的mark
 * @param {*} editor 编辑器实例
 * @param {*} markType mark类型
 */
export function hasMark(editor, markType) {
  if (!editor) {
    return false;
  }
  const { value } = editor;
  return value.activeMarks.some((mark) => mark.type === markType);
}

/**
 * 设置光标处mark类型
 * @param {*} editor 编辑器实例
 * @param {*} markType mark类型
 */
export function toggleMark(editor, markType) {
  if (!editor) {
    return;
  }
  editor.toggleMark(markType);
}

/**
 * 选中处是否包含指定block
 * @param {*} editor 编辑器实例
 * @param {*} blockType block类型
 */
export function hasBlock(editor, blockType) {
  if (!editor) {
    return false;
  }
  const { value } = editor;
  return value.blocks.some((node) => node.type === blockType);
}

/**
 * 选中处是否包含指定inline
 * @param {*} editor 编辑器实例
 * @param {*} inlineType block类型
 */
export function hasInline(editor, inlineType) {
  if (!editor) {
    return false;
  }
  const { value } = editor;
  return (
    value.inlines &&
    value.inlines.some((node) => {
      return node.type === inlineType;
    })
  );
}
