import * as React from 'react';
import { HOTKEYS, MARKS } from '../../constants';

interface IOptions {
  type?: string;
  hotkey?: string;
  tip?: React.ReactNode;
  [key: string]: any;
}

const DEFAULT_OPTIONS: IOptions = {
  type: MARKS.SUB,
  hotkey: HOTKEYS[MARKS.SUB],
  tip: '下标',
};

export default DEFAULT_OPTIONS;

export { IOptions, DEFAULT_OPTIONS };
