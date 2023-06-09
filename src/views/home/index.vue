<template>
  <div>我是一级目录 home</div>
</template>

<script setup lang="ts">
//引入
import { onMounted } from "vue";
import { useUserStore } from "@/store/module/user.ts";
let userStore = useUserStore();
//一挂载就去请求
onMounted(() => {
  userStore.userInfo();
});
</script>

<style scoped></style>
