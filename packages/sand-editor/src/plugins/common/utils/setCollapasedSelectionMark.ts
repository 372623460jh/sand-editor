import { MARKS } from '../../../constants';

const { FORE_COLOR, COMMON_MARK } = MARKS;

// TODO: common-mark 重复添加处理
export function setCollapsedSelectionMark(editor, markType, data = {}, range) {
  const { value } = editor;
  const { document, selection } = value;
  const documentMarks = document.getMarksAtRange(range).filter((mark) => {
    return mark.type === markType;
  });
  let markData: any = { ...data };

  // TODO: 相同的 mark 时，退出 mark
  // eslint-disable-next-line
  let isSameMark = false;

  // 删除 document 的 mark
  // TODO: 待梳理，FORE_COLOR 已经不存在
  if (!documentMarks.isEmpty()) {
    documentMarks.forEach((mark) => {
      if (markType === FORE_COLOR) {
        // @ts-ignore
        isSameMark = mark.data.get('foreColor') === data.foreColor;
      }

      // 冗余逻辑，documentMarks 获取时已经过滤
      if (mark.type === COMMON_MARK) {
        // COMMON_MARK 保留其他 data
        // TODO: 如果 data 相同时不做保留
        markData = { ...mark.data.toJS(), ...data };
      }

      editor.removeMark(mark);
    });
  }

  // 删除 selection 的 mark
  const marks = selection.get('marks');

  if (marks) {
    marks.forEach((mark) => {
      if (mark.type === markType) {
        editor.removeMark(mark);
      }
    });
  }

  editor.addMark({
    type: markType,
    data: markData,
  });

  // editor.focus();

  return editor;
}
