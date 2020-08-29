import { decodeHtml } from './encodeHtml';

describe('decode or encode', () => {
  // dva 相关测试
  test('decode or encode', () => {
    const decodeString = '<div>sss</div>';
    const encodeString = '&lt;div&gt;sss&lt;/div&gt;';
    expect(decodeHtml(encodeString)).toBe(decodeString);
  });
});
