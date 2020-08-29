import { toggleSupMark } from './commands';
import { createKeyDownHandler } from './handlers';
import { createSupRenderer } from './render';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';
import { IOptions, DEFAULT_OPTIONS } from './options';

export default function SupPlugin(options: IOptions = {}) {
  const opts = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return {
    toolbar: toolbar(opts),
    commands: {
      toggleSupMark: toggleSupMark.bind(null, opts),
    },
    onKeyDown: createKeyDownHandler(opts),
    renderMark: createSupRenderer(opts),
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(opts),
  };
}
