// 商品分类全局组件的小仓库
import { defineStore } from "pinia";
import { reqC1, reqC2, reqC3 } from "@/api/product/attr";
import { CategorySate } from "@/store/module/types/types.ts";

const useCategoryStore = defineStore("Category", {
  state: (): CategorySate => {
    return {
      c1Id: "",
      c1Attr: [],
      c2Id: "",
      c2Attr: [],
      c3Attr: [],
      c3Id: "",
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
    async getC2() {
      const result = await reqC2(this.$state.c1Id as number);
      if (result.code == 200) {
        this.$state.c2Attr = result.data;
      } else {
        await Promise.reject(result.message);
      }
    },
    async getC3() {
      const result = await reqC3(this.$state.c2Id as number);
      if (result.code == 200) {
        this.$state.c3Attr = result.data;
      } else {
        await Promise.reject(result.message);
      }
    },
  },
  // getters: {}
});
export { useCategoryStore };
