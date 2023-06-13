<script setup lang="ts">
import Category from "@/components/Category/index.vue";
</script>

<template>
  <div class="card-top">
    <Category></Category>
  </div>
  <div>
    <el-card class="card-bottom">
      <el-button type="primary" icon="Plus">添加属性</el-button>
      <el-table border>
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        ></el-table-column>
        <el-table-column label="属性名称" width="120px"></el-table-column>
        <el-table-column label="属性值名称"></el-table-column>
        <el-table-column label="操作" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-top {
}
el-table {
  margin-top: 10px;
}
.card-bottom {
  margin-top: 10px;
}
</style>
