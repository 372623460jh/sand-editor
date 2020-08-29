function merge(target, source) {
  return Object.keys(source).reduce((tgt, key) => {
    if (key === 'redos' || key === 'undos') {
      return tgt;
    }
    const value = source[key];
    return tgt.set(key, value);
  }, target);
}

/**
 * 将数据合并进editor.value.data中
 * @param editor
 * @param data
 */
export default function mergeData(editor, data) {
  const { value } = editor;
  return editor.setData(merge(value.data, data));
}
