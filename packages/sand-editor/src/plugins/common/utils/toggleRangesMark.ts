import { Mark } from '@jianghe/slate';

export default function toggleRangesMark(editor, ranges, mark) {
  const creatMark = Mark.create(mark);
  const { value } = editor;
  const { selection, document } = value;

  const isAllSetMark = ranges.every((range) => {
    const marks = document.getActiveMarksAtRange(range);

    return marks.some((m) => {
      return m.equals(creatMark);
    });
  });

  // 保证不选中时也能添加样式
  if (ranges.length === 1 && selection.isCollapsed) {
    const type = mark.type || mark;
    const hasMark = value.activeMarks.some((m) => m.type === type);

    if (!hasMark) {
      editor.addMark(mark);
    } else {
      editor.removeMark(mark);
    }

    return editor;
  }

  if (isAllSetMark) {
    ranges.forEach((range) => {
      editor.removeMarkAtRange(range, mark);
    });
  } else {
    ranges.forEach((range) => {
      editor.addMarkAtRange(range, mark);
    });
  }

  return editor;
}
