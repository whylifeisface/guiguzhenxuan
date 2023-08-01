<script setup lang="ts">
//引入分类接口方法
import { onMounted } from "vue";
import { useCategoryStore } from "@/store/module/category";

//当处于修改页面不能够点击el-select
defineProps(["scene"]);
const categoryStore = useCategoryStore();
// 已挂载就通知仓库发请求获取一级分类的数据
onMounted(() => {
  getC1();
});
// 通知仓库获取一级分类的方法
const getC1 = () => {
  categoryStore.getC1();
};
// 通知仓库获取二级分类的方法

const getC2 = () => {
  categoryStore.getC2();
};
// 通知仓库获取三级分类的方法
const getC3 = () => {
  categoryStore.getC3();
};
//select 值一旦发生变化 通知仓库发送请求获得二级分类
const handler = () => {
  //要将前一次的数据清空 因为一级分类变化了 二级分类 三级分类 要重新拿
  categoryStore.$state.c2Id = "";
  categoryStore.$state.c3Id = "";
  categoryStore.$state.c3Attr = [];
  getC2();
};
//select 值一旦发生变化 通知仓库发送请求获得三级分类
const handler1 = () => {
  categoryStore.c3Id = "";
  // categoryStore.c3Attr = [];
  getC3();
};
//c3Id变化 触发
const handler2 = () => {
  getC3();
};
</script>

<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select
            :disabled="scene == 1"
            v-model="categoryStore.$state.c1Id"
            @change="handler"
          >
            <!--
            label是展示的数据
            value select收集的数据
                        -->
            <el-option
              v-for="c1 in categoryStore.$state.c1Attr"
              :key="c1.id"
              :label="c1.name"
              :value="c1.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--        二级分类处理  1.监听change-->
        <el-form-item label="二级分类">
          <el-select
            :disabled="scene == 1"
            v-model="categoryStore.$state.c2Id"
            @change="handler1"
          >
            <el-option
              v-for="c2 in categoryStore.$state.c2Attr"
              :key="c2.id"
              :label="c2.name"
              :value="c2.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select :disabled="scene == 1" v-model="categoryStore.$state.c3Id">
            <el-option
              @change="handler2"
              v-for="c3 in categoryStore.c3Attr"
              :key="c3.id"
              :label="c3.name"
              :value="c3.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  g
</template>

<style scoped lang="scss"></style>
