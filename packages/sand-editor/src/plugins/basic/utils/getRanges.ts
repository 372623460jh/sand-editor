export default function getRanges(value) {
  const edgeSelection = value.data.get('edgeSelection');
  if (edgeSelection) {
    return [];
  }
  return [value.selection];
}
