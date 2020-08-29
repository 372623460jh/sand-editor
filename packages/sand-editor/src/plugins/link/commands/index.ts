import { INLINES } from '../../../constants';
import { hasInline } from '../../../utils';

// 移除链接
function removeLinks(editor, ranges) {
  ranges.forEach((range) => {
    editor.unwrapInlineAtRange(range, INLINES.LINK);
  });
}

// 添加链接
function addLink(editor, ranges) {
  const { selection } = editor.value;
  if (selection.isExpanded) {
    removeLinks(editor, ranges);

    editor.wrapInlineAtRange(editor.value.selection, {
      type: INLINES.LINK,
      data: {
        attrs: { href: '', target: '_blank' },
        showEditBar: true,
      },
    });
  } else {
    // 光标位置在链接标签上， 移除
    if (hasInline(editor, INLINES.LINK)) {
      return removeLinks(editor, ranges);
    }

    editor.insertInlineAtRange(editor.value.selection, {
      type: INLINES.LINK,
      data: {
        attrs: { href: '', target: '_blank' },
        showEditBar: true,
      },
      nodes: [
        {
          object: 'text',
          text: '链接',
        },
      ],
    });
  }
}

export { addLink, removeLinks };
