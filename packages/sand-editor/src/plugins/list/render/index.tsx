import * as React from 'react';
import { BLOCKS } from '../../../constants';
import ListRender from '../components/ListRender';
import './index.less';

export function renderBlock(props, editor, next) {
  const { node } = props;
  if (node.type === BLOCKS.LIST_ITEM) {
    // 为LIST_ITEM时使用ListRender组件
    return <ListRender editor={editor} {...props} />;
  }
  return next();
}
