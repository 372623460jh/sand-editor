import ErrorBoundaryPlugin from './error-boundary';
import ParagraphPlugin from './paragraph';
// 粗体
import BoldPlugin from './bold';
// 斜体
import ItalicPlugin from './italic';
// 中划线
import StrikethroughPlugin from './strikethrough';
// 下划线
import UnderlinePlugin from './underline';
// 上标
import SupPlugin from './sup';
// 下标
import SubPlugin from './sub';
// 字体颜色
import ForeColorPlugin from './forecolor';
// 字体背景色
import BackColorPlugin from './backcolor';
// 分割线
import HrPlugin from './hr';
// 有序列表，无序列表
import ListPlugin from './list';
// 撤销重做
import HistoryPlugin from './history';
// 对齐
import AlignPlugin from './alignment';
// 引用
import BlockquotePlugin from './blockquote';
// 字体大小
import FontSizePlugin from './fontSize';
// 标题
import HeadingPlugin from './heading';
// 段间距
import ParagraphSpacingPlugin from './paragraphSpacing';
// 行间距
import RowSpacingPlugin from './rowSpacing';
// 两端缩进
import ParagraphBothEndsPaddingPlugin from './paragraphBothEndsPadding';
// inline
import ImagePlugin from './image';
// 超链接
import LinkPlugin from './link';
// 清除格式
import CleanStylePlugin from './cleanStyle';
// 格式刷
import FormatPainterPlugin from './formatPainter';
// 字间距
import LetterSpacingPlugin from './letterSpacing';
// emoji
import EmoticonPlugin from './emoticon';

// 业务应该按需注册，通过 tree shaking 优化打包
export {
  ErrorBoundaryPlugin,
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
  SupPlugin,
  SubPlugin,
  ListPlugin,
};
