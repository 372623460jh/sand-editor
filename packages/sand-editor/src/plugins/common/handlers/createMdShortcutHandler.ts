import { Range, Mark, Point } from '@jianghe/slate';
import { MARKS } from '../../../constants';
import hasMark from '../utils/hasMark';
import { createDebug } from '../../../utils';

const debug = createDebug('createMdShortcutHandler');

const MARK_REGEX = {
  // **加粗**
  [MARKS.BOLD]: /\s?(\*\*)((?!\1).)+?\1$/m,
  // `code`
  [MARKS.CODE]: /\s?(`)((?!\1).)+?\1$/m,
  // *斜体* _斜体_
  [MARKS.ITALIC]: /\s?(\*|_)((?!\1).)+?\1$/m,
  // ~~删除线~~
  [MARKS.STRIKETHROUGH]: /\s?(~~)((?!\1).)+?\1$/m,
  // __下划线__
  [MARKS.UNDERLINE]: /\s?(__)((?!\1).)+?\1$/m,
};

export default function createMdShortcutHandler(options = {}) {
  // @ts-ignore
  const { type } = options;

  return function handler(event, editor, next) {
    const { value } = editor;
    const { selection } = value;

    if (selection.isExpanded || !type) {
      return next();
    }

    if (hasMark(value, type)) {
      return next();
    }

    const { texts } = value;
    const { anchor } = selection;
    const currentTextNode = texts.get(0);
    const currentLineText = currentTextNode.text;
    const offsetBeforeSpace = anchor.offset - 1;
    // const lastChar = currentLineText.charAt(offsetBeforeSpace);
    // 截取逻辑有点多余
    const textBeforeSpace = currentLineText.substring(0, offsetBeforeSpace + 1);

    const markRegex = MARK_REGEX[type];

    if (!markRegex) {
      return next();
    }

    const matched = textBeforeSpace.match(markRegex);

    debug('mark type: ', type);
    debug('textBeforeSpace: ', `[${textBeforeSpace}]`);
    debug('regex matched: ', matched);

    if (!matched) {
      return next();
    }

    event.preventDefault();

    const matchedLength = matched[0].length;
    const delimiter = matched[1];
    const reg =
      // prettier-ignore
      // eslint-disable-next-line no-nested-ternary
      delimiter === '**' ? /\*\*/ : (delimiter === '*' ? /\*/ : delimiter);
    const addText = matched[0].replace(new RegExp(reg, 'g'), '');
    // const cursorOffset = matched.index + addText.length;

    // 匹配的文本范围
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

    return (
      editor
        .deleteAtRange(range)
        // 重新插入文本并设置 mark
        .insertTextByKey(currentTextNode.key, matched.index, addText, [
          Mark.create({ type }),
        ])
        .command((c) => {
          // console.log(c.value.selection, 'cmd');
          c.insertTextByKey(c.value.selection.focus.key, addText.length, ' ')
            // .moveAnchorTo(addText.length)
            // 将锚点后移动一个字符，选中空格，去除 mark
            // TODO: 如何不增加空格，但去除格式
            .moveAnchorBackward(1)
            .removeMark(type)
            .moveToFocus();

          // .moveAnchorTo(addText.length + 1);
          // console.log(c.value.selection, 'cmd after move');

          return c;
        })
    );
  };
}
