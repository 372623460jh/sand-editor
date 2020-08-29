import getRandomId from '../../common/utils/getRandomId';
import isList from './isList';
import isEmpty from './isEmpty';

/**
 * 获取listid
 * @param {*} value svi
 * @param {*} restart 是否是新节点，新节点直接生成新id
 */
function getListId(value, restart) {
  if (restart) {
    return getRandomId();
  }

  // startBlock光标选中开始处的block节点
  const { document, startBlock } = value;
  // 获取当前选中节点的前一个兄弟节点(li)
  let prevSibling = document.getPreviousSibling(startBlock.key);

  // 遍历出上一个list节点
  while (prevSibling) {
    if (isList(prevSibling)) {
      // 如果前一个兄弟节点是list返回前一个节点的id
      return prevSibling.data.get('list').listId;
    }
    if (isEmpty(prevSibling)) {
      // 如果前一个兄弟节点是一个空节点
      break;
    }
    prevSibling = document.getPreviousSibling(prevSibling.key);
  }

  // 取下一个兄弟节点(li)判断是不是list，是的话直接返回list的id
  const nextSibling = document.getNextSibling(startBlock.key);
  if (nextSibling && isList(nextSibling)) {
    return nextSibling.data.get('list').listId;
  }

  return getRandomId();
}

export default getListId;
