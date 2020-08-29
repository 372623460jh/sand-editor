// @ts-ignore
export function getFieldByKey({ list = [], key, field = 'label' } = {}) {
  if (key === undefined) {
    throw new Error('getLabelByKey: `key` is required!');
  }

  let ret;

  list.some((item) => {
    if (item.key === key) {
      ret = item[field];

      return true;
    }

    return false;
  });

  return ret;
}

export function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
