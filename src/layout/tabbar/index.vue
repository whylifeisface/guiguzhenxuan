<script setup lang="ts">
import Breadcrumbe from "@/layout/tabbar/breadcrumb/index.vue";
import { useLayoutSettingStore } from "@/store/module/setting.ts";
import { Expand, Fold } from "@element-plus/icons-vue";
import Icon from "@/layout/tabbar/icon/index.vue";

const layoutSettingStore = useLayoutSettingStore();
// const fold = layoutSettingStore.fold;
// import { Expand, Fold } from "@element-plus/icons-vue";
// const fold = ref(false);
const changeIcon = () => {
  console.log(123);
  layoutSettingStore.fold = !layoutSettingStore.fold;
  console.log(layoutSettingStore.fold);
};
</script>

<script lang="ts">
export default {
  name: "Tabbar",
};
</script>

<template>
  <div class="tab_bar">
    <div class="tab_bar_left">
      <el-icon @click="changeIcon">
        <!--        已经全局引入-->
        <Component :is="layoutSettingStore.fold ? Expand : Fold" />
      </el-icon>
      <!--    左侧图标和 breadcrumb-->
      <Breadcrumbe />
    </div>
    <div class="tab_bar_right">
      <Icon />
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
