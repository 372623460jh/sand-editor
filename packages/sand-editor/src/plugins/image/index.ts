import { INLINES } from '../../constants';
import { onKeyDown } from './handlers';
import { createInlineRenderer } from './render';
import { createSchema } from './validation';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';
import { insertImage } from './commands';
import isSelectionInImage from './utils/inSelectionInImage';

export default function ImagePlugin(options = {}) {
  const opts = { type: INLINES.IMAGE, ...options };

  return {
    queries: {
      isSelectionInImage: isSelectionInImage.bind(null, opts),
    },
    schema: createSchema(opts),
    commands: {
      insertImage: insertImage.bind(null, opts),
    },
    toolbar: toolbar(opts),
    onKeyDown,
    renderInline: createInlineRenderer(opts),
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(opts),
  };
}
