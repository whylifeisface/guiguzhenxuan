<script setup lang="ts">
import Breadcrumbe from "@/layout/tabbar/breadcrumb/index.vue";
</script>

<template>
  <div class="tab_bar">
    <div class="tab_bar_left">
      <el-icon>
        <Expand />
      </el-icon>
      <!--    左侧图标和 breadcrumb-->
      <Breadcrumbe />
    </div>
    <div class="tab_bar_right">
      <el-button size="small" icon="Refresh" circle />
      <el-button size="small" icon="FullScreen" circle />
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
  </div>
</template>

<style scoped lang="scss">
.tab_bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(232, 223, 223),
    rgb(201, 178, 178),
    #e08d8d
  );

  .tab_bar_left {
    margin-left: 18px;
    display: flex;
    align-items: center;
  }

  .tab_bar_right {
    display: flex;
    align-items: center;

    img {
      margin-left: 8px;
    }
  }
}
</style>