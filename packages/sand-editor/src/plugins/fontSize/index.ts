import toolbar from './toolbar';
import { marksRender, createRule } from '../marks';

export default function FontSizePlugin(options = {}) {
  // @ts-ignore
  const { disableHtmlRule } = options;

  return {
    toolbar: toolbar(options),
    // 统一在 marks 里渲染
    renderMark: marksRender,
    htmlRule: disableHtmlRule ? undefined : createRule(options),
  };
}
