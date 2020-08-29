import { onKeyDown } from './handlers';
import { renderBlock } from './render';
import schema from './schema';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';
import { COMMANDS } from '../../constants';
import { wrapInBlockquote, unwrapBlockquote } from './commands';

export default function BlockquotePlugin(options) {
  return {
    schema,
    commands: {
      [COMMANDS.WRAP_IN_BLOCKQUOTE]: wrapInBlockquote,
      [COMMANDS.UNWRAP_BLOCKQUOTE]: unwrapBlockquote,
    },
    toolbar: toolbar(options),
    onKeyDown,
    renderBlock,
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
