import { tinyPick } from '../../../utils';

// Image 组件目前支持的入参
const supportAttrs = ['id', 'name', 'src', 'alt', 'width', 'height'];

/**
 * 插入图片命令
 *
 * @param options
 * @param editor Editor
 * @param img Image Object
 * @returns Editor
 */
export default function insertImage(options, editor, img) {
  // if (isSelectionInHr(editor.value)) {
  //   editor.insertBlock('paragraph');
  // }

  const images = Array.isArray(img) ? img : [img];

  images.forEach((image) => {
    const attrs = tinyPick(image, supportAttrs);

    editor
      .insertInline({
        type: options.type,
        // Image data 入参必须透明，可静态声明的
        data: {
          attrs,
          // 单独处理 className
          className: image.className || {},
          // 图片的内联样式
          style: image.style || {},
        },
      })
      .moveToStartOfNextText()
      // TODO: for what? 可能是图片插入后插入一个空字符来解决光标焦点的问题吧
      .insertText(' ')
      // 添加 focus 后可以解决图标点击不会获得焦点问题
      .focus();
  });

  return editor.focus();
}
