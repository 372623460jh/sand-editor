// https://www.typescriptlang.org/docs/handbook/declaration-merging.html

/// <reference path="../../node_modules/@types/webpack-env/index.d.ts" />
/// <reference path="../../node_modules/@types/react/index.d.ts" />
/// <reference path="../../node_modules/@types/react-dom/index.d.ts" />

/**
 * 定义模块使ts中可加载less module文件
 */
declare module '*.less' {
  const resource: { [key: string]: string };
  export = resource;
}
