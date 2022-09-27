import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'BonBon学前端',
  themeConfig: {
    sidebar: [
      {
        text: 'vue',
        items: [
          { text: '权衡的艺术', link: '/vue/chapter1' },
          { text: '框架设计的核心要素', link: '/vue/chapter2' },
        ],
      },
      {
        text: 'antd',
        items: [{ text: 'Form', link: '/antd/form' }],
      },
      {
        text: '一些API',
        items: [{ text: 'MutationObserver', link: '/api/mutation-observer' }],
      },
      {
        text: '一些工具',
        items: [
          { text: 'npm、yarn 和 pnpm', link: '/lib/npm' },
          { text: 'dnd kit', link: '/lib/dndkit' },
        ],
      },
      {
        text: '随笔',
        items: [{ text: '关于职级晋升', link: '/essays/20220927' }],
      },
    ],
  },
  vite: {
    server: {
      open: true,
    },
  },
});
