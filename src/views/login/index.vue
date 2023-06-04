<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到xx甄选</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              size="default"
              @click="login"
              class="login_btn"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import useRouter from "vue-router";
import { useUserStore } from "@/store/module/user";

import type { LoginForm } from "@/api/type";
import { ElNotification } from "element-plus";

let loading = ref(false);
const $router = useRouter();
const useStore = useUserStore();
const login = async () => {
  //通知仓库发请求
  try {
    loading.value = true;
    await useStore.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      type: "success",
      message: "登录成功",
    });
  } catch (error) {
    loginForm.password = "";
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  } finally {
    loading.value = false;
  }
};
const loginForm: LoginForm = reactive({
  username: "",
  password: "",
});
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("D:\\newProject\\project\\src\\assets\\images\\background.jpg")
    no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("D:\\newProject\\project\\src\\assets\\images\\login_form.png");
    background-size: cover;
    padding: 10px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
