//user stock
import { defineStore } from "pinia";
import { reqLogin } from "@/api/index";
import type { LoginForm } from "@/api/type";
import { LoginResponseData } from "@/api/type";
import { UserState } from "./types/types";
import { GET_TOKEN, SET_TOKEN } from "../../utils/token.ts";

const useUserStore = defineStore("User", {
  //
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
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
        //保证async 放回一个成功的promise
        return "ok";
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});
export { useUserStore };
