import * as React from 'react';
import BoldButton from './components/BoldButton';
import { getHotkeyDesc } from '../../utils';

// eslint-disable-next-line no-unused-vars
export default function toolbar(options = {}) {
  // @ts-ignore
  const { tip, hotkey, type } = options;
  const tipNode = hotkey ? `${tip} ${getHotkeyDesc(hotkey)}` : tip;

  return {
    button: (props) => <BoldButton tip={tipNode} {...props} markType={type} />,
  };
}
