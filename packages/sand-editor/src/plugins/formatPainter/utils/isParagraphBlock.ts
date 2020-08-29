const paragraphBlocks = {
  'heading-1': true,
  'heading-2': true,
  'heading-3': true,
  'heading-4': true,
  'heading-5': true,
  'heading-6': true,
  paragraph: true,
};

/**
 * 是否是一个段落block
 * @param param0
 */
export default function isParagraphBlock({ type }) {
  return paragraphBlocks[type];
}
