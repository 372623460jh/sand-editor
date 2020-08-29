import toolbar from './toolbar';
import { clearStyles } from './commands';

export default function CleanStylePlugin(options) {
  return {
    toolbar: toolbar(options),
    commands: {
      clearStyles,
    },
  };
}
