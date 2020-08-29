import { onKeyDown } from './handlers';
import { createBlockRenderer } from './render';
import toolbar from './toolbar';
import { createHtmlRule } from './rules';
import { COMMANDS, BLOCKS } from '../../constants';
import { setHeading } from './commands';

const {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  HEADING_4,
  HEADING_5,
  HEADING_6,
} = BLOCKS;

const HEADING_TYPES = {
  1: HEADING_1,
  2: HEADING_2,
  3: HEADING_3,
  4: HEADING_4,
  5: HEADING_5,
  6: HEADING_6,
};

export default function HeadingPlugin(options: { [key: string]: any } = {}) {
  const { level = [1, 2, 3, 4], ...restOptions } = options;
  const enabledHeadings = [];

  level.sort().forEach((l) => {
    if (HEADING_TYPES[l]) {
      enabledHeadings.push(HEADING_TYPES[l]);
    }
  });

  const nextOptions = { enabledHeadings, ...restOptions };

  return {
    commands: {
      [COMMANDS.SET_HEADING]: setHeading,
    },
    toolbar: toolbar(nextOptions),
    onKeyDown: onKeyDown.bind(null, nextOptions),
    renderBlock: createBlockRenderer(nextOptions),
    // HTML 序列化、反序列化规则
    htmlRule: createHtmlRule(nextOptions),
  };
}
