<script setup lang="ts">
import { useLayoutSettingStore } from "@/store/module/setting.ts";

const layoutSettingStroe = useLayoutSettingStore();
const updateRefresh = () => {
  layoutSettingStroe.refresh = !layoutSettingStroe.refresh;
};
const fullScreen = () => {
  console.log();
  let fullScreen = document.fullscreenElement;
  //null非全屏 true全屏
  if (!fullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    // 退出全屏
    document.exitFullscreen();
  }
};
</script>

<template>
  <div>
    <el-button size="small" icon="Refresh" circle @click="updateRefresh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-button size="small" icon="Setting" circle />
    <img src="/public/logo.png" alt="" style="width: 24px; height: 24px" />
    <el-dropdown>
      <span>
        admin
        <el-icon>
          <arrow-down></arrow-down>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss"></style>
