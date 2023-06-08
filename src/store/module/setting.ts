// layout 相关配置
import { defineStore } from "pinia";
//关于tabbar 图标的切换 涉及到 slider是否折叠 bread则爹
export const useLayoutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false, // 控制折叠还是打开
      refresh: false,
    };
  },
  // getters: {},
});
