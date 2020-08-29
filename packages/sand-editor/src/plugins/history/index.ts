import toolbar from './toolbar';

export default function HistoryPlugin(options) {
  return {
    toolbar: toolbar(options),
  };
}
