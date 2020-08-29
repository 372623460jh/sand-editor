import { Range, Point } from '@jianghe/slate';

/**
 * Markdown 快捷键：`![example](http://example.com "Optional title")[space]` 转换为 image
 * @param event
 * @param editor
 * @param next
 * @returns {*}
 */
export default function onSpace(event, editor, next) {
  const { value } = editor;
  const { selection } = value;

  if (selection.isExpanded) {
    return next();
  }

  const { texts } = value;
  const currentTextNode = texts.get(0);
  const currentLineText = currentTextNode.text;
  // ![example](http://example.com "Optional title")
  // /!\[([^\]]+)]\(([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?)\)/
  // ![alt](url)[Space] alt 可选
  const matched = currentLineText.match(/!\[([^\]]*)]\(([^\s)]+)\)$/);

  if (matched) {
    event.preventDefault();

    const matchedLength = matched[0].length;

    const range = Range.create({
      anchor: Point.create({
        key: currentTextNode.key,
        offset: matched.index,
      }),
      focus: Point.create({
        key: currentTextNode.key,
        offset: matched.index + matchedLength,
      }),
    });

    editor.deleteAtRange(range);

    editor.insertImage({
      alt: matched[1],
      src: matched[2],
    });

    return editor;
  }

  return next();
}
