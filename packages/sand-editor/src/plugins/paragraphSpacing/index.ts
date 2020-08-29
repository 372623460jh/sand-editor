import toolbar from './toolbar';
import { setParagraphSpacing } from './commands';

export default function ParagraphSpacingPlugin(options = {}) {
  return {
    toolbar: toolbar(options),
    commands: {
      setParagraphSpacing: setParagraphSpacing.bind(null, options),
    },
  };
}
