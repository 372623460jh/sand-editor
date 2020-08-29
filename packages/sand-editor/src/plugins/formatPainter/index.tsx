import * as React from 'react';
import toolbar from './toolbar';
import onClick from './handlers/onClick';
import onKeyDown from './handlers/onKeyDown';
import mergeData from './commands/mergeData';
import clearFormatClipboard from './commands/clearFormatClipboard';
import copyFormat from './commands/copyFormat';
import pasteFormatAtRange from './commands/pasteFormatAtRange';
import FormatPainterWrapper from './components/formatPainterWrapper';

export default function createFormatPainterPlugin(options = {}) {
  // eslint-disable-next-line
  return {
    toolbar: toolbar(options),
    onClick,
    onKeyDown,
    commands: {
      mergeData, // 注册合并指令到editor中
      clearFormatClipboard,
      copyFormat, // 设置格式刷格式到剪贴板中
      pasteFormatAtRange,
    },
    renderEditor: (props, editor, next) => {
      return (
        <FormatPainterWrapper {...props} editor={editor}>
          {next()}
        </FormatPainterWrapper>
      );
    },
  };
}
