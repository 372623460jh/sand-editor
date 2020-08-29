import React from 'react';
import SandEditor, {
  createDefaultValue,
  createPlugins,
  createHTMLSerializer,
  registerPlugin,
  createValue,
} from '@jianghe/sand-editor';
// @ts-ignore
import { getEventTransfer } from '@jianghe/sand-editor/slate-react';
import {
  AlignPlugin,
  BackColorPlugin,
  BlockquotePlugin,
  BoldPlugin,
  CleanStylePlugin,
  FontSizePlugin,
  ForeColorPlugin,
  FormatPainterPlugin,
  HeadingPlugin,
  HistoryPlugin,
  HrPlugin,
  ImagePlugin,
  ItalicPlugin,
  LinkPlugin,
  ParagraphPlugin,
  ParagraphSpacingPlugin,
  ParagraphBothEndsPaddingPlugin,
  RowSpacingPlugin,
  StrikethroughPlugin,
  UnderlinePlugin,
  LetterSpacingPlugin,
  EmoticonPlugin,
  ListPlugin,
} from '@jianghe/sand-editor/esm/plugins';
import BLOCKS from '@jianghe/sand-editor/esm/constants/blocks';
import emoticonList from '../config/emojiList';
import './AllPlugins.less';

const { ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, ALIGN_JUSTIFY } = BLOCKS;

// 注册插件，通过 registerPlugin 注册的插件会应用于所有 SandEditor 实例
// @ts-ignore
registerPlugin({
  list: ListPlugin,
  alignment: AlignPlugin,
  history: HistoryPlugin,
  paragraph: ParagraphPlugin,
  fontSize: FontSizePlugin,
  link: LinkPlugin,
  image: ImagePlugin,
  bold: BoldPlugin,
  italic: ItalicPlugin,
  strikethrough: StrikethroughPlugin,
  underline: UnderlinePlugin,
  forecolor: ForeColorPlugin,
  backcolor: BackColorPlugin,
  hr: HrPlugin,
  blockquote: BlockquotePlugin,
  heading: HeadingPlugin,
  paragraphSpacing: ParagraphSpacingPlugin,
  rowSpacing: RowSpacingPlugin,
  paragraphBothEndsPadding: ParagraphBothEndsPaddingPlugin,
  cleanStyle: CleanStylePlugin,
  formatPainter: FormatPainterPlugin,
  letterSpacing: LetterSpacingPlugin,
  emoticon: EmoticonPlugin,
});

/**
 * 传递公共参数
 * plugins的数据格式是
 * {
 *  map: {
 *    list:{
 *       toolbar: toolbar(options),
 *       onKeyDown,
 *       renderNode,
 *       htmlRule: createRule(options),
 *    }
 *  },
 *  array: [
 *    {
 *      list:{
 *        toolbar: toolbar(options),
 *        onKeyDown,
 *        renderNode,
 *        htmlRule: createRule(options),
 *      }
 *    },
 *  ],
 * }
 */
const plugins = createPlugins({
  // 插件参数，key 和插件注册时的 name 对应
  alignment: {
    alignmentList: [ALIGN_LEFT, ALIGN_CENTER, ALIGN_RIGHT, ALIGN_JUSTIFY],
  },
  paragraphSpacing: {
    paragraphSpacingTopList: [2, 5, 10, 15, 20, 25],
    paragraphSpacingBottomList: [2, 5, 10, 15, 20, 25],
  },
  rowSpacing: {
    rowSpacingList: [1, 1.5, 1.6, 1.75, 2, 3, 4, 5],
  },
  letterSpacing: {
    defaultLetterSpacing: '0px',
    letterSpacingList: [0, 0.5, 1, 2, 4],
  },
  paragraphBothEndsPadding: {
    paragraphBothEndsPaddingList: [0, 8, 16, 32, 48],
  },
  fontSize: {
    defaultFontSize: '16px',
    fontSizeList: [12, 14, 16, 18, 20, 24, 36],
  },
  backcolor: {
    defaultColor: '#FFFFFF',
  },
  forecolor: {
    defaultColor: '#595959',
  },
  bold: {
    foo: 'bar',
  },
  heading: {
    level: [1, 2, 3, 4, 5, 6],
  },
  image: {
    onBtnClick(event, editor) {
      event.preventDefault();
      const src = window.prompt('Enter the URL of the image:');
      if (!src) {
        return editor;
      }
      return editor.insertImage({
        src: src.trim(),
        alt: 'test image',
        style: {
          maxWidth: '100%',
        },
      });
    },
  },
  iframe: {
    onBtnClick(event, editor) {
      event.preventDefault();
      return editor.insertIframe({
        style: {
          width: '100%',
          height: 400,
        },
      });
    },
  },
  emoticon: {
    // 表情列表
    emoticonList,
    // 一行显示几个表情
    columnsNum: 16,
  },
});

const html = createHTMLSerializer({ plugins: plugins.array });

class AllPlugins extends React.Component {
  state = {
    value: createDefaultValue(),
  };

  onChange = (value) => {
    console.log(value.toJSON());
    console.log(`HTML`, html.serialize(value));
    this.setState({ value });
  };

  // 粘贴监听
  onPaste = (event, editor, next) => {
    const data = getEventTransfer(event);
    // 拷贝粘贴html
    if (data.type === 'html') {
      // 当类型为html时进行反序列化
      const svjJson = html.deserialize(data.html, { toJSON: true });
      // 调用createValue获取svi
      const { document } = createValue(svjJson);
      // 读取svi中的document插入到当前光标中
      return editor.insertFragment(document);
    }
    return next();
  };

  render() {
    const { value } = this.state;

    return (
      <SandEditor
        toolbar={[
          'history.undo',
          'history.redo',
          'cleanStyle',
          'formatPainter',
          'emoticon',
          'bold',
          'italic',
          'strikethrough',
          'underline',
          'forecolor',
          'backcolor',
          'fontSize',
          'heading',
          'rowSpacing',
          'alignment',
          'alignment.align-left',
          'alignment.align-center',
          'alignment.align-right',
          'alignment.align-justify',
          'paragraphSpacing.paragraph-spacing-top',
          'paragraphSpacing.paragraph-spacing-bottom',
          'paragraphBothEndsPadding',
          'hr',
          'blockquote',
          'list.ordered-list',
          'list.unordered-list',
          'table',
          'code',
          'codeblock',
          'iframe',
          'link',
          'image',
          'letterSpacing',
        ]}
        placeholder={'\u200b'}
        plugins={plugins}
        value={value}
        onChange={this.onChange}
        onPaste={this.onPaste}
      />
    );
  }
}

export default AllPlugins;
