import * as React from 'react';
import { HOTKEYS, MARKS } from '../../constants';

interface IOptions {
  type?: string;
  hotkey?: string;
  tip?: React.ReactNode;
  [key: string]: any;
}

const DEFAULT_OPTIONS: IOptions = {
  type: MARKS.SUP,
  hotkey: HOTKEYS[MARKS.SUP],
  tip: '上标',
};

export default DEFAULT_OPTIONS;

export { IOptions, DEFAULT_OPTIONS };
