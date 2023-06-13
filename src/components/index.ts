//对外暴露插件
import SvgIcon from "@/components/svgIcon/index.vue";
//引入element plus 图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Category from "./Category/index.vue";
const allGlobalComponent = {
  SvgIcon,
  Category,
};
// type A = keyof typeof allGlobalComponent;
// Object.keys(allGlobalComponent).forEach((key) => {
//     //   app.component(key, allGlobalComponent[key]);
//     console.log(key);
//   });
// const A = {
// };

export default {
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key: string) => {
      app.component(
        key,
        allGlobalComponent[key as keyof typeof allGlobalComponent],
      );
      for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
      }
    });
  },
};
// as keyof typeof allGlobalComponent
