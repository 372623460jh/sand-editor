import { onKeyDown } from './handlers';
import { renderMark } from './render';
import toolbar from './toolbar';
import { toggleItalicMark } from './commands';
import { createHtmlRule } from './rules';

export default function ItalicPlugin(options) {
  return {
    toolbar: toolbar(options),
    commands: {
      toggleItalicMark: toggleItalicMark.bind(null, options),
    },
    onKeyDown,
    renderMark,
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
