import debug from 'debug';

/**
 * 通用 debug 方法
 * localStorage.debug = 'SandEditor:*' 开启
 * @param module
 */
export function createDebug(module) {
  return debug(`SandEditor:${module}`);
}
