import onSpace from './onSpace';

const KEY_SPACE = ' ';

export function onKeyDown(event, editor, next) {
  const args = [event, editor, next];

  if (event.key === KEY_SPACE) {
    // @ts-ignore
    return onSpace(...args);
  }

  return next();
}
