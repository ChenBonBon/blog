export const themeData = JSON.parse("{\"sidebar\":[{\"text\":\"vue\",\"children\":[{\"text\":\"权衡的艺术\",\"link\":\"/vue/chapter1\"},{\"text\":\"框架设计的核心要素\",\"link\":\"/vue/chapter2\"}]},{\"text\":\"antd\",\"children\":[{\"text\":\"Form\",\"link\":\"/antd/form\"}]},{\"text\":\"一些API\",\"children\":[{\"text\":\"MutationObserver\",\"link\":\"/api/mutation-observer\"}]},{\"text\":\"一些工具\",\"children\":[{\"text\":\"npm、yarn 和 pnpm\",\"link\":\"/lib/npm\"},{\"text\":\"Emotion\",\"link\":\"/lib/emotion\"}]},{\"text\":\"随笔\",\"children\":[{\"text\":\"关于职级晋升\",\"link\":\"/essays/20220927\"}]},{\"text\":\"面试\",\"children\":[{\"text\":\"JS基础\",\"children\":[{\"text\":\"执行上下文和执行栈\",\"link\":\"/interview/js/context\"}]}]}],\"locales\":{\"/\":{\"selectLanguageName\":\"English\"}},\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"navbar\":[],\"logo\":null,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"sidebarDepth\":2,\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"lastUpdatedText\":\"Last Updated\",\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
