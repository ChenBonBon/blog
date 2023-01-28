import { defaultTheme, defineUserConfig } from 'vuepress';
import SimpleEncrypt from '../../pkg/vuepress-plugin-simple-encrypt';

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'BonBon学前端',
  theme: defaultTheme({
    sidebar: [
      {
        text: 'vue',
        children: [
          { text: '权衡的艺术', link: '/vue/chapter1' },
          { text: '框架设计的核心要素', link: '/vue/chapter2' },
        ],
      },
      {
        text: 'antd',
        children: [{ text: 'Form', link: '/antd/form' }],
      },
      {
        text: '一些API',
        children: [
          { text: 'MutationObserver', link: '/api/mutation-observer' },
        ],
      },
      {
        text: '一些工具',
        children: [
          { text: 'npm、yarn 和 pnpm', link: '/lib/npm' },
          { text: 'Emotion', link: '/lib/emotion' },
        ],
      },
      {
        text: '随笔',
        children: [{ text: '关于职级晋升', link: '/essays/20220927' }],
      },
      {
        text: '面试',
        children: [
          {
            text: 'JS基础',
            children: [
              { text: '执行上下文和执行栈', link: '/interview/js/context' },
              { text: '作用域', link: '/interview/js/scope' },
              { text: 'this', link: '/interview/js/this' },
              { text: 'call、apply和bind', link: '/interview/js/call' },
              { text: '闭包', link: '/interview/js/closure' },
              { text: '原型和原型链', link: '/interview/js/prototype' },
              { text: 'Class', link: '/interview/js/class' },
              { text: 'Promise', link: '/interview/js/promise' },
              { text: 'async/await', link: '/interview/js/async' },
            ],
          },
        ],
      },
    ],
    themePlugins: {
      backToTop: true,
      nprogress: true,
    },
  }),
  open: true,
  plugins: [SimpleEncrypt()],
});
