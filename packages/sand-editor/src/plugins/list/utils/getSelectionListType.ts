import getRangeItem from './getRangeItem';

/**
 * 获取选中区域list的类，类型主要有以下5类：由于5种中只用区分第一种和其他
 * 全是list ，list类型是一致      YY
 * 全是list ，list类型不是一致     YN
 * 不全是list ，list类型是一致     NY
 * 不全是list ，list类型不是一致   NN
 * 全不是list                    A-
 * @return YY/--
 */
export default function getSelectionListType(value) {
  if (!value) return null;
  // 获取当前选中的所有节点对应的层级最深的block集合
  const blocks = getRangeItem(value);
  if (!blocks) return null;

  // 全是list
  let allList = 'Y';
  // 类型一致
  let unify = 'Y';
  // 上一个节点的类型
  let lastType = '-1';

  blocks.map((block) => {
    const list = block.data.get('list');
    if (list && unify !== '-') {
      if (lastType === '-1') {
        lastType = list.type || '';
      } else if (lastType !== '-1' && lastType !== list.type) {
        // 当前list类型和上一个list类型不一致
        unify = '-';
      }
    }
    if (!list && allList === 'Y') {
      allList = '-';
    }
    return block;
  });

  const res = allList === 'Y' ? `${allList}${unify}` : '--';

  return {
    listType: res,
    listData: lastType,
  };
}
