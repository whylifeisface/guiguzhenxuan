<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rule"
          ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到xx甄选</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
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
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/module/user";
import type { LoginFormData } from "@/api/type";
import { ElNotification, FormRules } from "element-plus";
import { getTime } from "@/utils/Time";
import { useRoute } from "vue-router";

const $route = useRoute();
let loading = ref(false);
const $router = useRouter();
const useStore = useUserStore();

const loginForm = reactive<LoginFormData>({
  username: "admin",
  password: "atguigu123",
});
const loginFormRef = ref(null);
const login = async () => {
  // @ts-expect-error
  await loginFormRef.value?.validate();

  //通知仓库发请求
  try {
    loading.value = true;
    await useStore.userLogin(loginForm);
    const redirect: string = <string>$route.query.redirect;
    if (redirect == undefined) {
      await $router.push("/");
    } else {
      await $router.push(redirect);
    }
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
// const validatorUserName = (role, value, callBack) => {
//   // 数组校验对象 表单内容 函数
//   if (/^\d{5,10}$/.test(value)) {
//     callBack();
//   } else {
//     callBack(new Error("长度为5"));
//   }
// };
const validatePassword = (
  _: any,
  value: any,
  callback: (error?: string | Error) => void,
) => {
  if (value.length > 4) {
    callback();
  } else {
    callback(new Error("长度大于4"));
  }
};
const rule = reactive<FormRules>({
  username: [
    { required: true, message: "用户名不能为空", trigger: "blur" },
    // { trigger: "blur", validator: validatorUserName },
  ],
  password: [
    {
      required: true,
      min: 4,
      max: 15,
      message: "密码不能少于8位",
      trigger: "blur",
    },
    {
      trigger: "blur",
      validator: validatePassword,
    },
  ],
});
// const message = ref("");
//获得时间 判断时间是早上还是下午还是晚上

//vue3 @keydow.enter 需要组件获取焦点 addEventListener 可以实现按下enter执行login（）
document.addEventListener("keydown", (event) => {
  let key = event.key;
  if (key == "Enter") {
    login();
  }
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
