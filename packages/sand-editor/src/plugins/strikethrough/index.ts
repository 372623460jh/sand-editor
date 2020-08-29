import { onKeyDown } from './handlers';
import { toggleStrikeMark } from './commands';
import { renderMark } from './render';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';

export default function StrikethroughPlugin(options) {
  return {
    toolbar: toolbar(options),
    commands: {
      toggleStrikeMark: toggleStrikeMark.bind(null, options),
    },
    onKeyDown,
    renderMark,
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
