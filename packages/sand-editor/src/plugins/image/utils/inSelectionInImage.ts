export default function isSelectionInImage(options, editor) {
  const { value } = editor;
  const { selection, document } = value;

  return Boolean(
    selection.isCollapsed &&
      document.getClosest(
        selection.start.key,
        ({ type }) => options.type === type
      )
  );
}
