<script setup lang="ts">
import { useRoute } from "vue-router";
const $route = useRoute();
</script>

<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="(item, index) in $route.matched"
        v-show="item.meta.title"
        :key="index"
        :to="item.path"
      >
        <!--        TODO 文字不居中-->
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="scss">
.breadcrumb {
  align-items: center;
}
</style>
