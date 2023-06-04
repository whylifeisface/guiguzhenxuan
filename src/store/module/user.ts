//user stock
import { defineStore } from "pinia";
import { reqLogin } from "@/api/index";
import type { LoginForm } from "@/api/type";

const useUserStore = defineStore("User", {
  //
  state: () => {
    return {
      token: localStorage.getItem("TOKEN"),
    };
  },
  actions: {
    //登录方法实现
    async userLogin(data: LoginForm) {
      const result = await reqLogin(data);
      //登录成功放回 token 失败 clc password
      if (result.code == 200) {
        const token = result.data.token;
        this.token = token;
        localStorage.setItem("TOEKN", token);
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
