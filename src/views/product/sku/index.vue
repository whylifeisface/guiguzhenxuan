<script setup lang="ts">
import { ref } from "vue";

const total = ref(0);
const pageSize = ref(0);
const pageNo = ref(0);
</script>
<template>
  sku管理
  <div>
    <el-table border>
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column label="名称" />
      <el-table-column label="描述" />
      <el-table-column label="默认图片" />
      <el-table-column label="重量" />
      <el-table-column label="价格(元)" />
      <el-table-column label="操作" fixed width="">
        <el-button icon="Upload" type="success"></el-button>
        <el-button icon="Edit" type="primary"></el-button>
        <el-button icon="Search" type="info"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      layout="prev,pager,next,jumper,->,sizes,total"
      v-model:total="total"
      page-sizes="[10,20,30,100]"
    />
  </div>
</template>

<style scoped lang="scss"></style>
