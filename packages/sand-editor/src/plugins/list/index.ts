import { onKeyDown } from './handlers';
import { renderBlock } from './render';
import toolbar from './toolbar';
import { createRule } from './rules';

export default function ListPlugin(options) {
  return {
    toolbar: toolbar(options),
    onKeyDown,
    renderBlock,
    // HTML 序列化、反序列化规则
    htmlRule: createRule(options),
  };
}
