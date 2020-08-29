import { onKeyDown } from './handlers';
import toolbar from './toolbar';

export default function AlignPlugin(options = {}) {
  return {
    toolbar: toolbar(options),
    onKeyDown,
  };
}
