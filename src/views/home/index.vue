<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.$state.avatar" class="avatar" />
        <div class="bottom">
          <h3 class="title">{{ time }}好呀{{ userStore.$state.username }}</h3>
          <p class="subtitle">xx甄选运营平台</p>
        </div>
      </div>
    </el-card>
    <div class="bo">
      <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入用户相关仓库获取当前用户的头像
import { onMounted } from "vue";
import { useUserStore } from "@/store/module/user";
import { getTime } from "@/utils/Time";
let userStore = useUserStore();
let time = getTime();
//一挂载就去请求
onMounted(() => {
  userStore.userInfo();
});
</script>

<style scoped>
.box {
  display: flex;
  .avatar {
    height: 100px;
    width: 100px;
    border-radius: 8px;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .subtitle {
      font-style: italic;
      font-weight: 200;
    }
  }
}
.bo {
  display: flex;
  justify-content: center;
}
</style>
