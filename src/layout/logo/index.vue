<script setup lang="ts">
import { setting } from "@/setting.ts";
</script>

<template>
  <div class="logo">
    <img :src="setting.logo" alt="" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  display: flex;
  width: 100%;
  height: $base-menu-logo-height;
  align-items: center;
  padding: 20px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font: $base-menu-logo-title-fontSize;
    margin-left: 10px;
  }
}
</style>
