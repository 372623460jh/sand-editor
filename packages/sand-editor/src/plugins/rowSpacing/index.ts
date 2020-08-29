import toolbar from './toolbar';
import { setRowSpacing } from './commands';

export default function RowSpacingPlugin(options = {}) {
  return {
    toolbar: toolbar(options),
    commands: {
      setRowSpacing: setRowSpacing.bind(null, options),
    },
  };
}
