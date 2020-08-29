import { getTextLength } from './commands';

export default function BasicPlugin(options = {}) {
  const opts = {
    ...options,
  };

  return {
    queries: {
      getTextLength: getTextLength.bind(null, opts),
    },
  };
}
