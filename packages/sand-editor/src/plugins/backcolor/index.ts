import toolbar from './toolbar';
import { COMMANDS } from '../../constants';
import { backColor } from './commands';
import { marksRender, createRule } from '../marks';

export default function BackColorPlugin(options = {}) {
  // @ts-ignore
  const { disableHtmlRule } = options;

  return {
    commands: {
      [COMMANDS.BACK_COLOR]: backColor,
    },
    toolbar: toolbar(options),
    // 公共的markRender
    renderMark: marksRender,
    // HTML 序列化、反序列化规则
    htmlRule: disableHtmlRule ? undefined : createRule(options),
  };
}
