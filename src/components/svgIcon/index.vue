<template>
  <div>
    <svg :style="{ width, height }">
      <use :xlink:href="preifx + name"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //图标前缀
  preifx: {
    type: String,
    default: "#icon-",
  },
  name: String, // 图标名字
  colo: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "16px",
  },
  height: {
    type: String,
    default: "16px",
  },
});
//颜色
</script>

<!-- <style scoped></style> -->
