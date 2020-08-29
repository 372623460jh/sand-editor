export default function hasMark(value, mark) {
  return value.activeMarks.some((m) => m.type === mark);
}
