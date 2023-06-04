<script setup lang="ts"></script>

<template>
  <div>
    111
    <svg>
      <use xlink:href="#icon-phone" fill="white"></use>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
div {
  color: $base-color;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
