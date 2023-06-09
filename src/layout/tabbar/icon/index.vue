<script setup lang="ts">
import { useLayoutSettingStore } from "@/store/module/setting.ts";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/module/user.ts";
// 用户头像和名字
let userStore = useUserStore();
const layoutSettingStroe = useLayoutSettingStore();
const $router = useRouter();
const $route = useRoute();
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
const logout = () => {
  userStore.logout();
  $router.push({ path: "/login", query: { redirect: $route.path } });
  console.log(123);
};
</script>

<template>
  <div>
    <el-button size="small" icon="Refresh" circle @click="updateRefresh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-button size="small" icon="Setting" circle />
    <!--    TODO img 和 span 不居中-->
    <img
      :src="userStore.avatar"
      alt=""
      style="width: 24px; height: 24px; border-radius: 50%"
    />
    <el-dropdown>
      <span>
        {{ userStore.username }}
        <el-icon>
          <arrow-down></arrow-down>
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss"></style>
