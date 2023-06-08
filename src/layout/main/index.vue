<script setup lang="ts">
import { useLayoutSettingStore } from "@/store/module/setting.ts";
import { ref, watch, nextTick } from "vue";
//获取更新后的
let layoutSettingStore = useLayoutSettingStore();
//监听refresh 是否变化 如果变化用v-if销毁组件 并重新创建
watch(
  () => layoutSettingStore.refresh,
  () => {
    flag.value = false;
    //重新创建组件
    console.log(456);
    nextTick(() => {
      // TODO network没有重新发包
      flag.value = true;
      console.log(123);
    });
  },
);
let flag = ref(true);
</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--        渲染layout子路由的-->
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
