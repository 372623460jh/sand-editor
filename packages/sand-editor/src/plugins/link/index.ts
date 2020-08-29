import { onKeyDown } from './handlers';
import { renderInline } from './render';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';

export default function LinkPlugin(options) {
  return {
    // 工具栏
    toolbar: toolbar(options),

    // 键盘事件
    onKeyDown,

    onSelect(event, editor, next) {
      return next();
    },

    // 编辑器渲染
    renderInline,

    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
