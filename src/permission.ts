//路由鉴权
import { router } from "@/router/index.ts";
//包内有样式
// @ts-expect-error
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { pinia } from "@/store";
import { useUserStore } from "@/store/module/user.ts";
import { setting } from "@/setting.ts";
//不要小圆圈
nprogress.configure({ showSpinner: false });
//没有大仓库会失败
const userStore = useUserStore(pinia);
// console.log(userStore.$state);
// 路由切换将出现进度条 nprogress
// 全局前置守卫 login | 404 | 任意 | 数据大屏 | 首页 | 商品管理 | 权限管理
// 未登录 只能去login 404
// 登录成功 不可以去login
router.beforeEach(async (to, _, next) => {
  // console.log(to.path);
  // to 去哪 from 从哪来 next 放行函数
  // start是方法

  nprogress.start();
  //已登录  TODO token 只是一个快照不准确
  // const token = userStore.$state.token;
  //获取用户的名字  因为刷新销毁组件 要重新发请求
  const username = userStore.$state.username;
  // console.log(`${username}  111111`);
  if (userStore.$state.token) {
    if (to.path == "/login") next({ path: "/" });
    else {
      // console.log("woihoa");
      //登录成功去其他的地方 结果为成功
      if (username) {
        next();
      } else {
        if (to.path == "/login") next();
        else {
          try {
            await userStore.userInfo();
            next();
          } catch (e) {
            console.log(e);
            //token 过期
            //用户修改数据
            // 退出登录清空数据
            await userStore.logout();
            console.log(username == "");
            next({ path: "/login", query: { redirect: to.path } });
          }
        }
        //发请求获取用户信息
      }
    }
  } else {
    //未登录
    if (to.path == "/login") next();
    else next({ path: "/login", query: { redirect: to.path } });
  }
  // next();
});

// 全局后置守卫
router.afterEach((to) => {
  nprogress.done();
  document.title = `${setting.title}-${to.meta.title}`;
});

// permission要写在main.ts文件里面
