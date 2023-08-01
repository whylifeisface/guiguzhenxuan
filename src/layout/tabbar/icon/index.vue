<script setup lang="ts">
import { useLayoutSettingStore } from "@/store/module/setting";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/module/user";
import { ref } from "vue";
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
const logout = async () => {
  //await 成功才执行下面的代码
  await userStore.logout();
  await $router.push({ path: "/login", query: { redirect: $route.path } });
  console.log(123);
};

//setting 按钮
const color = ref("rgba(255,69,0,0.68)");

const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
const value = ref(false);
const changeDark = (value: boolean) => {
  //获取html根节点
  let htmlElement = document.documentElement;
  if (value) {
    htmlElement.classList.add("dark");
  } else {
    htmlElement.classList.remove("dark");
  }
};
const colorChange = () => {
  let htmlElement = document.documentElement;
  htmlElement.style.setProperty("--el-color-primary", color.value);
};
</script>

<template>
  <div>
    <el-button size="small" icon="Refresh" circle @click="updateRefresh" />
    <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
    <el-popover
      placement="bottom"
      :width="300"
      content=""
      trigger="hover"
      title="主题设置"
    >
      <!--      表单元素-->
      <el-form>
        <el-form-item label="主题颜色">
          <el-color-picker
            @change="colorChange"
            v-model="color"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <!--          el- -->
          <el-switch
            @change="changeDark"
            style="margin-left: 24px"
            inline-prompt
            v-model="value"
            size="small"
            active-icon="Moon"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle />
      </template>
    </el-popover>
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
