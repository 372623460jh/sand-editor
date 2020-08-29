import toolbar from './toolbar';
import { setParagraphBothEndsPadding } from './commands';

export default function ParagraphBothEndsPaddingPlugin(options = {}) {
  return {
    toolbar: toolbar(options),
    commands: {
      setParagraphBothEndsPadding: setParagraphBothEndsPadding.bind(
        null,
        options
      ),
    },
  };
}
