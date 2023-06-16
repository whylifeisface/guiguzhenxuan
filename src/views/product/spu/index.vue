<script setup lang="ts">
import Category from "@/components/Category/index.vue";
import { ref } from "vue";
//场景数据控制Category显示
const scene = ref(true);
let pageNo = ref(1);
let pageSize = ref(3);
const total = 10;
</script>

<template>
  <div>
    <!--    三级分类-->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="Plus">添加SPU</el-button>
      <el-table style="margin: 10px 0" border>
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80px"
        />
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-pagination
        layout="prev,pager,next,jumper,->,sizes,total"
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :total="total"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
