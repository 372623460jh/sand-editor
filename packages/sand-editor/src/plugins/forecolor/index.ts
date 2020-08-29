import toolbar from './toolbar';
import { COMMANDS } from '../../constants';
import { foreColor } from './commands';
import { marksRender, createRule } from '../marks';

export default function ForeColorPlugin(options = {}) {
  // @ts-ignore
  const { disableHtmlRule } = options;

  return {
    commands: {
      [COMMANDS.FORE_COLOR]: foreColor,
    },
    toolbar: toolbar(options),
    renderMark: marksRender,
    // HTML 序列化、反序列化规则
    htmlRule: disableHtmlRule ? undefined : createRule(options),
  };
}
