// dumi 配置文件
import { defineConfig } from 'dumi';

/**
 * 关于dumi的菜单配置
 * dumi的菜单配置属性menu
 *  是针对页面维度的,如果要针对某个具体的页面进行菜单修改，再配置该属性
 * dumi的导航栏配置属性navs
 *  配置导航栏
 */

// 更多配置: https://d.umijs.org/config
export default defineConfig({
  // 输出目录
  outputPath: 'dist-docs',
  // 文档的名称
  title: 'sand docs',
  // 默认为文档模式doc（左侧菜单 + 右侧内容），配置为 site 时可无缝切换为站点模式（导航头 + 左侧菜单 + 右侧内容）
  mode: 'site',
  // logo
  logo:
    'https://avatars2.githubusercontent.com/u/23350405?s=88&u=e6deb0d5fe572864d10c41b9bbda1a3305390586&v=4',
  // 支持国际化
  locales: [['zh-CN', '中文']],
  // 皮肤
  theme: {
    '@c-primary': '#1aad19',
  },
  // 只检索docs目录下的md文件
  resolve: {
    includes: ['docs'],
  },
});
