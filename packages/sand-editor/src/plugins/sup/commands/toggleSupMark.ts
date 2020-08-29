import toggleRangesMark from '../../common/utils/toggleRangesMark';
import { IOptions } from '../options';

export default function toggleSupMark(options: IOptions, editor: any): any {
  const { value } = editor;
  const { selection } = value;
  const ranges = [selection];

  return toggleRangesMark(editor, ranges, options.type);
}
