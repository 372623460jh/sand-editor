import onEnter from './onEnter';
import onSpace from './onSpace';

const KEY_ENTER = 'Enter';
const KEY_SPACE = ' ';

export function onKeyDown(options, event, editor, next) {
  const args = [options, event, editor, next];

  switch (event.key) {
    case KEY_ENTER:
      // @ts-ignore
      return onEnter(...args);
    case KEY_SPACE:
      // @ts-ignore
      return onSpace(...args);
    default:
      return next();
  }
}
