export const data = JSON.parse("{\"key\":\"v-f7f2705c\",\"path\":\"/vue/chapter2.html\",\"title\":\"框架设计的核心要素\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1662968990000,\"contributors\":[{\"name\":\"BonBon\",\"email\":\"per_cherry@163.com\",\"commits\":1}]},\"filePathRelative\":\"vue/chapter2.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
