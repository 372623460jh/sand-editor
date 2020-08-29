import { toggleBoldMark } from './commands';
import { createKeyDownHandler } from './handlers';
import { createBoldRenderer } from './render';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';
import { HOTKEYS, MARKS } from '../../constants';

export default function BoldPlugin(options = {}) {
  const opts = {
    type: MARKS.BOLD,
    hotkey: HOTKEYS[MARKS.BOLD],
    tip: '加粗',
    ...options,
  };

  return {
    toolbar: toolbar(opts),
    commands: {
      toggleBoldMark: toggleBoldMark.bind(null, opts),
    },
    onKeyDown: createKeyDownHandler(opts),
    renderMark: createBoldRenderer(opts),
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(opts),
  };
}
