<template>
  <div class="box">
    我是一级目录404
    <img src="../../assets/images/error_images/404.png" alt="" />
    <el-button type="primary" @click="goHome">首页</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

let $route = useRouter();
const goHome = () => {
  $route.push("/home");
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  img {
    width: 800px;
    height: 800px;
  }
}
</style>
