import { renderBlock } from './render';
import { createHtmlRule } from './rules';

export default function ParagraphPlugin(options) {
  return {
    renderBlock,
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(options),
  };
}
