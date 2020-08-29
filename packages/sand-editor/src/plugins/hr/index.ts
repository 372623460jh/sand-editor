import { onKeyDown } from './handlers';
import { renderBlock } from './render';
import schema from './schema';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';
import { COMMANDS } from '../../constants';
import { insertHr } from './commands';

export default function HrPlugin(options) {
  return {
    schema,
    commands: {
      [COMMANDS.INSERT_HR]: insertHr,
    },
    toolbar: toolbar(options),
    onKeyDown,
    renderBlock,
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
