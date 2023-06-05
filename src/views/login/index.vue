<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="LoginForm"
          :rules="rule"
          ref="loginFormRef"
          validate=""
        >
          <h1>Hello</h1>
          <h2>欢迎来到xx甄选</h2>
          <el-form-item>
            <el-input
              prop="username"
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              prop="password"
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/module/user";
import type { LoginForm } from "@/api/type";
import { ElNotification, FormRules } from "element-plus";
import { getTime } from "@/utils/Time";

let loading = ref(false);
const $router = useRouter();
const useStore = useUserStore();

const loginForm = reactive<LoginForm>({
  username: "",
  password: "",
});

const login = async () => {
  await loginFormRef.value?.validate();

  //通知仓库发请求
  try {
    loading.value = true;
    await useStore.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      type: "success",
      message: `Hi,${getTime()}好`,
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
//获得form组件实例
const loginFormRef = ref("loginFormRef");

const rule = reactive<FormRules>({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ require: true, message: "密码不能少于8位", trigger: "blur" }],
});
// const message = ref("");
//获得时间 判断时间是早上还是下午还是晚上
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("D:\\newProject\\project\\src\\assets\\images\\background.jpg") no-repeat;
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
