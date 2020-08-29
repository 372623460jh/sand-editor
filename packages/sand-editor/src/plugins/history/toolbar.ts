import Redo from './components/Redo';
import Undo from './components/Undo';
import { COMMANDS } from '../../constants';

// eslint-disable-next-line no-unused-vars
export default function toolbar(options) {
  return {
    [COMMANDS.REDO]: Redo,
    [COMMANDS.UNDO]: Undo,
  };
}
