import { createApp } from "vue";
// import "./style.css";
//element-plus 集成
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//挂载
import App from "./App.vue";
//svg注册
import "virtual:svg-icons-register";

import globalComponent from "@/components/index";
//项目路由
import { router } from "@/router";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "./permission.ts";
// pinia
import { pinia } from "@/store";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(globalComponent).use(router).use(pinia);
app.mount("#app");
import "@/style/index.scss";
console.log(import.meta.env);
