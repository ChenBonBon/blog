import { defineConfig } from "vitepress";

export default defineConfig({
  title: "BonBon学前端",
  themeConfig: {
    sidebar: [
      {
        text: "vue",
        items: [
          { text: "权衡的艺术", link: "/vue-chapter1" },
          { text: "框架设计的核心要素", link: "/vue-chapter2" },
        ],
      },
      {
        text: "一些API",
        items: [{ text: "MutationObserver", link: "/mutation-observer" }],
      },
    ],
  },
  vite: {
    server: {
      open: true,
    },
  },
});
