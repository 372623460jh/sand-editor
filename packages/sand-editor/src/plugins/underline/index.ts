import { onKeyDown } from './handlers';
import { toggleUnderlineMark } from './commands';
import { renderMark } from './render';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';

export default function UnderlinePlugin(options) {
  return {
    toolbar: toolbar(options),
    commands: {
      toggleUnderlineMark: toggleUnderlineMark.bind(null, options),
    },
    onKeyDown,
    renderMark,
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
