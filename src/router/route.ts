//使用vue-router 实现路由 暴露router

import { RouteRecordRaw } from "vue-router";

const route: RouteRecordRaw[] = [
  {
    path: "/login", //登录页面
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "login",
      hidden: true, //在菜单是否显示
      icon: "Promotion", //
    },
  },
  {
    path: "/", //主页面
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "layout",
      hidden: false,
      icon: "Avatar",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "homeFilled",
        },
      },
    ],
  },
  {
    path: "/404", //丢失页面
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
  },

  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },
];
//常量路由
export const staticRoute = [
  {
    path: "/login", //登录页面
    component: () => import("@/views/login/index.vue"),
    name: "login",
    meta: {
      title: "login",
      hidden: true, //在菜单是否显示
      icon: "Promotion", //
    },
  },
  {
    path: "/", //主页面
    component: () => import("@/layout/index.vue"),
    name: "layout",
    meta: {
      title: "layout",
      hidden: false,
      icon: "Avatar",
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "homeFilled",
        },
      },
    ],
  },
  {
    path: "/404", //丢失页面
    component: () => import("@/views/404/index.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
  },

  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue"),
    name: "Screen",
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: "Platform",
    },
  },
];
//任意路由
export const anyRoute = [
  {
    path: "/:pathMath(.*)*", //丢失页面
    redirect: "/404",
    name: "any",
    meta: {
      title: "login",
      hidden: true,
    },
  },
];
export const constantRoute = route;
//异步路由
export const asyncRoute = [
  {
    path: "/acl",
    component: () => import("@/layout/index.vue"),
    redirect: "/acl/user",
    meta: {
      icon: "Lock",
      title: "权限管理",
      hidden: false,
    },
    children: [
      {
        path: "/acl/user",
        component: import("@/views/acl/user/index.vue"),
        meta: { title: "用户管理", hidden: false, icon: "User" },
      },
      {
        path: "/acl/role",
        component: import("@/views/acl/role/index.vue"),
        meta: { title: "角色管理", hidden: false, icon: "UserFilled" },
      },
      {
        path: "/acl/permission",
        component: import("@/views/acl/permission/index.vue"),
        meta: { title: "权限管理", hidden: false, icon: "Monitor" },
      },
    ],
  },
  {
    path: "/product",
    component: import("@/layout/index.vue"),
    name: "Product",
    redirect: "/product/trademark",
    meta: {
      title: "商品管理",
      hidden: false,
      icon: "Goods",
    },
    children: [
      {
        path: "/product/trademark",
        component: import("@/views/product/trademark/index.vue"),
        name: "TradeMark",
        meta: {
          title: "品牌管理",
          icon: "ShoppingCartFull",
          hidden: false,
        },
      },
      {
        path: "/product/sku",
        component: import("@/views/product/sku/index.vue"),
        name: "Sku",
        meta: {
          title: "sku管理",
          icon: "Orange",
          hidden: false,
        },
      },
      {
        path: "/product/spu",
        component: import("@/views/product/spu/index.vue"),
        name: "Spu",
        meta: {
          title: "spu管理",
          icon: "Calendar",
          hidden: false,
        },
      },
      {
        path: "/product/attr",
        component: import("@/views/product/attr/index.vue"),
        name: "Attr",
        meta: {
          title: "attr管理",
          icon: "ChromeFilled",
          hidden: false,
        },
      },
    ],
  },
];
