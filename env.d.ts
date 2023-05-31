import {DefineComponent} from "vue"

declare module "*.vue" {
    const component:DefineComponent<{},{},any}>
    export default component
}
//vite 使用的是ts ts 不识别.vue后缀的文件