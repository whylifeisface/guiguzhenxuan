//user stock
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogout } from "@/api";
import type { LoginFormData } from "@/api/type";
import { LoginResponseData } from "@/api/type";
import { UserState } from "./types/types";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token.ts";
//@ts-ignore
import cloneDeep from "lodash";
//引入常量路由
import { anyRoute, asyncRoute, constantRoute } from "@/router/route.ts";
import { router } from "@/router";
//过滤异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filters((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item, routes);
      }
      return true;
    }
  });
}
const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 存储生成菜单需要的数组 route
      username: "",
      avatar: "",
      buttons: [],
    };
  },
  actions: {
    init() {
      this.$state.token = GET_TOKEN();
    },
    //登录方法实现
    async userLogin(data: LoginFormData) {
      const result: LoginResponseData = await reqLogin(data);
      //登录成功放回 token 失败 clc password
      if (result.code == 200) {
        const token = result.data as string;
        this.$state.token = token;
        SET_TOKEN(token);
        //保证async 放回一个成功的promise

        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //获取用户信息头像名字
    async userInfo() {
      const data = await reqUserInfo();
      // console.log(data.data.data.name);
      if (data.code == 200) {
        this.username = data.data.name;
        this.avatar = data.data.avatar;
        this.buttons = data.data.buttons;
        const useRoutes = filterAsyncRoute(
          cloneDeep(asyncRoute),
          data.data.routes,
        );
        this.menuRoutes = [...useRoutes, ...constantRoute, ...anyRoute];
        [...useRoutes, anyRoute].forEach((route) => router.addRoute(route));
        console.log("menuRoutes" + this.menuRoutes);
        return "ok";
      } else {
        //失败处理
        return Promise.reject("获取用户信息失败");
      }
    },
    async logout() {
      const result = await reqLogout();
      if (result.code == 200) {
        REMOVE_TOKEN();
        this.username = "";
        this.avatar = "";
        this.token = "";
        return "ok";
      } else return Promise.reject(new Error(result.message));
    },
  },
  getters: {},
});
export { useUserStore };
