const path = require('path');

module.exports = {
  // webpack服务启动端口
  port: 9898,
  //webpack配置
  webpackOptions: {
    entry: path.resolve(__dirname, './examples/common/index.tsx'),
    entryHtml: path.resolve(__dirname, './examples/common/index.html'),
    tsShouldBabel: true,
  },
  // rollup 配置
  configurations: [
    {
      buildType: 'babel',
      pkgPath: path.resolve(__dirname, './packages/sand-editor-ui'),
      isTs: true,
      moduleType: ['esm', 'cjs'],
    },
    {
      buildType: 'babel',
      pkgPath: path.resolve(__dirname, './packages/sand-editor'),
      isTs: true,
      moduleType: ['esm', 'cjs'],
    },
  ],
};
