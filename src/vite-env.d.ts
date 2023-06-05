/// <reference types="vite/client" />
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<
    NonNullable<unknown>,
    NonNullable<unknown>,
    never
  >;
  export default component;
}
//vite 使用的是ts ts 不识别.vue后缀的文件
