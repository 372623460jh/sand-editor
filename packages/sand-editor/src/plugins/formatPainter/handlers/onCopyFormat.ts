import copyFormat from '../commands/copyFormat';

/**
 * 处理键盘快捷键获取格式
 * @param event
 * @param editor
 */
export default function onCopyFormat(event, editor) {
  event.preventDefault();
  return copyFormat(editor, 'keyboard');
}
