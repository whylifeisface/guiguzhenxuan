<script setup lang="ts">
//引入分类接口方法
// import { reqC1 } from "@/api/product/attr/index.ts";
import { onMounted } from "vue";
import { useCategoryStore } from "@/store/module/category.ts";
const categoryStore = useCategoryStore();
// 已挂载就通知仓库发请求获取一级分类的数据
onMounted(() => {
  getC1();
});
// 通知仓库获取一级分类的方法
const getC1 = async () => {
  await categoryStore.getC1();
};
</script>

<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <el-select v-model="categoryStore.$state.c1Id">
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
        <el-form-item label="二级分类">
          <el-select>
            <el-option label="北上广"></el-option>
            <el-option label="english"></el-option>
            <el-option label="math"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select>
            <el-option label="北上广"></el-option>
            <el-option label="english"></el-option>
            <el-option label="math"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
