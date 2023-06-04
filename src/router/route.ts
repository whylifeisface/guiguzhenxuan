//使用vue-router 实现路由 暴露router

import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/login", //登录页面
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    path: "/home", //主页面
    component: () => import("@/views/home/index.vue"),
    name: "layout",
  },
  {
    path: "/404", //丢失页面
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  {
    path: "/:pathMath(.*)*", //丢失页面
    redirect: "/404",
    name: "any",
  },
];

export const constantRoute = route;
