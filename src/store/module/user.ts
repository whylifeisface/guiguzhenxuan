//user stock
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api";
import type { LoginForm } from "@/api/type";
import { LoginResponseData } from "@/api/type";
import { UserState } from "./types/types";
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from "@/utils/token.ts";

//引入常量路由
import { constantRoute } from "@/router/route.ts";

const useUserStore = defineStore("User", {
  //
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 存储生成菜单需要的数组 route
      username: "",
      avatar: "",
    };
  },
  actions: {
    //登录方法实现
    async userLogin(data: LoginForm) {
      const result: LoginResponseData = await reqLogin(data);
      //登录成功放回 token 失败 clc password
      if (result.code == 200) {
        const token = result.data.token as string;
        SET_TOKEN(token);
        console.log(token);
        //保证async 放回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
    //获取用户信息头像名字
    async userInfo() {
      const data = await reqUserInfo();
      if (data.code == 200) {
        this.username = data.data.checkUser.username;
        this.avatar = data.data.checkUser.avatar;
        return "ok";
      } else {
        //失败处理
        return Promise.reject("获取用户信息失败");
      }
    },
    logout() {
      REMOVE_TOKEN();
      this.username = "";
      this.avatar = "";
      this.token = "";
    },
  },
  getters: {},
});
export { useUserStore };
