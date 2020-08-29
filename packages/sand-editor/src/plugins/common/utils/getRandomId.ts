/**
 * 获取一个随机数id
 */
export default function getRandomId() {
  return Math.random().toString(36).slice(2);
}
