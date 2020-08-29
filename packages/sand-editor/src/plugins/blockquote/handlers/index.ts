import onEnter from './onEnter';
import onModEnter from './onModEnter';
import onBackspace from './onBackspace';
import onSpace from './onSpace';

const KEY_ENTER = 'Enter';
const KEY_BACKSPACE = 'Backspace';
const KEY_SPACE = ' ';

export function onKeyDown(event, editor, next) {
  const args = [event, editor, next];

  switch (event.key) {
    case KEY_ENTER:
      // MOD+Enter
      if (event.metaKey) {
        // @ts-ignore
        return onModEnter(...args);
      }

      // @ts-ignore
      return onEnter(...args);
    case KEY_BACKSPACE:
      // @ts-ignore
      return onBackspace(...args);
    case KEY_SPACE:
      // @ts-ignore
      return onSpace(...args);
    default:
      return next();
  }
}
