import toolbar from './toolbar';
import { marksRender, createRule } from '../marks';
import setLetterSpacing from './commands/setLetterSpacing';

/**
 * 字间距插件
 * @param options
 */
export default function LetterSpacingPlugin(options = {}) {
  // @ts-ignore
  const { disableHtmlRule } = options;

  return {
    commands: {
      setLetterSpacing, // 设置字间距
    },
    toolbar: toolbar(options),
    // 统一在 marks 里渲染
    renderMark: marksRender,
    // 序列化/反序列化
    htmlRule: disableHtmlRule ? undefined : createRule(options),
  };
}
