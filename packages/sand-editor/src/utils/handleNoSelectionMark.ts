import { Mark } from '@jianghe/slate';
import MARKS from '../constants/marks';
import { handleCommonMark } from '../plugins/common/handlers/commonMarkHandler';

const { COMMON_MARK } = MARKS;

/**
 * 切换基础mark
 * @param editor
 * @param ranges
 * @param mark
 */
function toggleBaseRangesMark(editor, ranges, mark) {
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
    return handleNoSelectionMark(editor, type, '', '');
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

/**
 * 处理没有选区时的mark设置
 * @param editor 编辑器实例
 * @param markType markType类型
 * @param key data中的key
 * @param data 设置的值
 */
export function handleNoSelectionMark(editor, markType, key, data) {
  if (!editor) return;
  const { value } = editor;
  const { selection, document } = value;
  if (!selection.isCollapsed) {
    // 有选区直接return
    return editor;
  }

  // 老mark
  let oldMark = null;
  // 新mark
  let newMark = null;
  // 获取当前光标处的common-mark
  // @ts-ignore
  document.getMarksAtRange(selection).filter((mark) => {
    if (mark.type === markType) {
      oldMark = mark;
    }
    return mark.type === markType;
  });

  if (oldMark) {
    if (markType === COMMON_MARK) {
      // common-mark
      // key存在合并
      const mergeAttr = key
        ? {
            ...oldMark.data.toJS(),
            [key]: data,
          }
        : {};
      // 合并后生成新的mark
      newMark = Mark.create({
        type: markType,
        data: mergeAttr,
        object: 'mark',
      });
      // 替换mark，插入0宽字符（防止中文输入法错位），聚焦
      editor.replaceMark(oldMark, newMark).insertText('\u200b');
    } else {
      // 如果有mark，清空
      editor.removeMark(oldMark).insertText('\u200b');
    }
  } else {
    const markData = key
      ? {
          [key]: data,
        }
      : {};
    // 当前光标处的common-mark不存在
    editor
      .addMark({
        type: markType,
        data: markData,
      })
      .insertText('\u200b');
  }
  return editor;
}

/**
 * 切换基础mark
 * @param editor
 * @param markType mark类型
 */
export function toggleBaseMark(editor, markType) {
  const { value } = editor;
  const { selection } = value;
  const ranges = [selection];
  return toggleBaseRangesMark(editor, ranges, markType).focus();
}

/**
 * 处理从common-mark切换
 * @param {*} editor 编辑器实例
 * @param {*} markType mark类型
 * @param {*} dataValue svi data中的值
 * @param {*} selectType 模式
 */
export function toggleCommonMark(editor, markType, key, dataValue) {
  if (!editor) return;
  const { value } = editor;
  const { selection } = value;
  if (markType === MARKS.COMMON_MARK && selection.isCollapsed) {
    // 处理无选区时mark操作
    handleNoSelectionMark(editor, markType, key, dataValue);
  } else {
    // 增加选中区域的mark
    handleCommonMark(
      'common-mark',
      {
        [key]: dataValue,
      },
      editor,
      'add'
    );
  }
  return editor.focus();
}
