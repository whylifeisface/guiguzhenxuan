# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## <!-- 全局注册组件 -->

method 1

` app.component("SvgIcon", SvgIcon);
`

method 2

// 对外暴露插件 好处 把所有全局组件注册了

```js
import SvgIcon from "@/components/svgIcon/index.vue";
const allGlobalComponent = {
  SvgIcon,
};
```

```js
export {
install(app){
Object.keys(allGlobalComponent).forEach(key => {
app.component(key,allGlobalComponent[key])
})
}
}
```

## Ts Object.key foreach 报错

[refer](https://fettblog.eu/typescript-better-object-keys/)

```
Object.keys(allGlobalComponent).forEach((key: string) => {
app.component(
key,
allGlobalComponent[key as keyof typeof allGlobalComponent],
);
console.log(key);
});
},
```

## tsconfig.json alias

```
{
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
}
}
```

**重点**

"@/_" : "./src/_"

"baseUrl" : "."

## ts 不能识别 .vue 文件

创建 .d.ts 文件写入

```
///  <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<
    NonNullable<unknown>,
    NonNullable<unknown>,
    never
  >;
  export default component;
}
```

根据 `tsconfig.json` including 值为 /src/\*\*/.d.ts
在 src 文件夹下创建

    //防止main撑开container
    overflow: auto;

<!--            //递归组件-->
            <Menu :menu-list="item.children"></Menu>