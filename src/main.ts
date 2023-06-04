import { createApp } from "vue";
import "./style.css";
import ElementPlus from "element-plus";
import App from "./App.vue";
import "virtual:svg-icons-register";
import globalComponent from "@/components/index";
import axios from "axios";
//@ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(globalComponent);
app.mount("#app");
import "@/style/index.sass";
console.log(import.meta.env);
// const a = 100;
axios({
  url: "api/user/login",
  method: "post",
  data: {
    username: "admin",
    password: "112112",
  },
});
