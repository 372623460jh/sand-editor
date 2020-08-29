/**
 * 表情模型
 */
class Emoticon {
  // 编码 ascii码
  code: string;

  // 内容
  text: string;

  // 提示
  tip: string;

  // 构造函数
  constructor(code: string, text: string, tip: string) {
    this.code = code;
    this.text = text;
    this.tip = tip;
  }

  // 获取表情内容
  getText(): string {
    return this.text;
  }
}

export default Emoticon;
