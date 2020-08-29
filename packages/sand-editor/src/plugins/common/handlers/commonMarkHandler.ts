/**
 * 获取当前选中text节点中的具体起始偏移值和长度
 * @param {*} node 节点
 * @param {*} range 选区
 */
function getNowTextOffset(node, range) {
  // 选区的开始和结束
  const { start, end } = range;
  const { key } = node;
  // 索引值
  let index = 0;
  // 文本长度
  let { length } = node.text;
  if (key === start.key) {
    // 选区开始位置
    index = start.offset;
  }
  if (key === end.key) {
    // 选区结束位置
    length = end.offset;
  }
  if (key === start.key && key === end.key) {
    // 选中区域内既是一个节点的开始也是一个节点的结束
    length = end.offset - start.offset;
  }
  return {
    index, // 偏移值
    length, // 长度
  };
}

/**
 * 控制公共mark的指令方法
 * @param {*} type mark type
 * @param {*} data new data
 * @param {*} editor editor实例
 * @param {*} model 模式（add：加mark，remove：减mark）
 */
export function handleCommonMark(type, data, editor, model) {
  const { value } = editor;
  const { document, selection } = value;

  // 获取选中区域的所有text节点
  const textNode = document.getTextsAtRange(selection);

  // withoutNormalizing包裹区域不执行序列化
  editor.withoutNormalizing(() => {
    textNode.forEach((node) => {
      // 获取text节点的选中区域
      const { index, length } = getNowTextOffset(node, selection);

      // text节点的key
      const { key } = node;

      // text节点下所有的mark数组
      const marks = node.marks.toArray();

      // 是否有要设置的mark类型
      let hasMarks = false;

      // 遍历marks
      for (let n = 0; n < marks.length; n += 1) {
        const mark = marks[n];
        const markType = mark.type;
        // 当前数据
        const nowData = mark.data.toJS();
        if (markType === type) {
          // 存在相同的mark
          hasMarks = true;
          if (model === 'add') {
            // 添加样式模式
            const newData = {
              ...nowData,
              ...data,
            };
            // 修改当前节点的mark
            editor.setMarkByKey(key, index, length, mark, {
              type,
              data: newData,
            });
            break;
          } else if (model === 'remove') {
            console.log('remove');
          }
        }
      }
      if (!hasMarks) {
        if (model === 'add') {
          // 没有找到指定mark
          const newData = {
            ...data,
          };
          // 增加当前节点的mark
          editor.addMarkByKey(key, index, length, {
            type,
            data: newData,
          });
        }
      }
      hasMarks = false;
    });
  });
}
