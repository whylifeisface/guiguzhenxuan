// 商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { reqC1 } from "@/api/product/attr";
import { CategorySate } from "@/store/module/types/types.ts";

const useCategoryStore = defineStore("Category", {
  state: (): CategorySate => {
    return {
      c1Id: "",
      c1Attr: [],
    };
  },
  actions: {
    async getC1() {
      const result = await reqC1();
      if (result.code == 200) {
        this.$state.c1Attr = result.data;
      } else {
        await Promise.reject(result.message);
      }
    },
  },
  // getters: {}
});
export { useCategoryStore };
