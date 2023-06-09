<script setup lang="ts">
import logo from "@/layout/logo/index.vue";
import Menu from "@/layout/menu/index.vue";
import Main from "@/layout/main/index.vue";
import TabBar from "@/layout/tabbar/index.vue";
import { useLayoutSettingStore } from "@/store/module/setting.ts";
import { useUserStore } from "@/store/module/user.ts";

const userStore = useUserStore();
const layoutSettingStore = useLayoutSettingStore();
</script>

<template>
  <div class="layout_container">
    <!--    :class="{ fold_class: layoutSettingStore.fold }"-->
    <div class="layout_slider">
      <logo></logo>
      <!--      展示菜单-->
      <el-scrollbar class="scrollbar">
        <!--        TODO collapse不生效-->
        <el-menu
          mode="vertical"
          :collapse="layoutSettingStore.fold"
          background-color="#001529"
          text-color="white"
          active-text-color="cyan"
          :default-active="$route.path"
        >
          <Menu :menu-list="userStore.$state.menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </div>

    <div
      class="layout_tab_bar"
      :class="{ fold_class: layoutSettingStore.fold }"
    >
      <TabBar></TabBar>
    </div>
    <div class="layout_main" :class="{ fold_class: layoutSettingStore.fold }">
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  //background: red;
  transition: all 0.8s;

  .layout_slider {
    height: 100%;
    width: $base-menu-width;
    background: $base-background-color;
    color: white;
  }

  .layout_tab_bar {
    padding: 10px;
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tab-bar-height;
    background: cyan;
    top: 0;
    left: $base-menu-width;
    transition: all 0.8s;
  }

  & .fold_class {
    width: calc(100vw - $base-menu-width-min);
    left: $base-menu-width-min;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tab-bar-height);
    background: yellow;
    top: $base-tab-bar-height;
    left: $base-menu-width;
    padding: 20px;
    //防止main撑开container
    overflow: auto;
    transition: all 0.8s;
  }
  & .fold_class {
    width: calc(100vw - $base-menu-width-min);
    left: $base-menu-width-min;
  }

  .scrollbar {
    width: 100%;
    height: calc(100% - $base-menu-logo-height);

    .el-menu {
      border-right: none;
    }
  }
}
</style>
