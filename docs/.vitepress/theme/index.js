import DefaultTheme from "vitepress/theme";
import "./custom.scss";
import "prismjs/themes/prism-coy.min.css";
import CodeBox from "../components/CodeBox.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
// 注册ElementPlugin
import AwComponents from "../components/ElementPlugin/index";

let localstorage = () => {
  try {
    return window.localStorage;
  } catch (error) {}
};

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app, router, siteData }) => {
    if (!localstorage()) return;
    app.use(ElementPlus);
    app.use(AwComponents);
    app.component("CodeBox", CodeBox);
    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  }
};
