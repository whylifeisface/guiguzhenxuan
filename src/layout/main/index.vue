<script setup lang="ts"></script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!--        渲染layout子路由的-->
        <component :is="Component" />
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
