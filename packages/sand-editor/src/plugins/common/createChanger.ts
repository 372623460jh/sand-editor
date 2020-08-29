import { Editor } from '@jianghe/slate';

export default function createChanger(command, plugins = []) {
  return function changer(value, ...args) {
    const editor = command.apply(null, [
      new Editor({
        value,
        plugins,
      }),
      ...args,
    ]);

    const change = {
      value: editor.value,
      operations: editor.operations,
    };

    return change;
  };
}
