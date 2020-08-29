import insertEmoticon from './commands/insertEmoticon';
import Emoticon from './model/Emoticon';
import toolbar from './toolbar';

export default function EmoticonPlugin(options = {}) {
  return {
    toolbar: toolbar(options),
    commands: {
      insertEmoticon: insertEmoticon.bind(null, options),
    },
  };
}

export { Emoticon };
