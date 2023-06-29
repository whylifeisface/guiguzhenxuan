<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";
import moment from "moment";
let router = useRouter();

let timer = ref(0);
onBeforeUnmount(() => {
  clearInterval(timer.value);
});
//一直更新时间
onMounted(() => {
  timer.value = setInterval(() => {
    // console.log(moment().format("YYYY年MM月DD日 hh:mm:ss"));
    time.value = moment().format("YYYY年MM月DD日 hh:mm:ss");
  }, 1000);
});
const goHome = () => {
  router.push("/home");
};
//当前时间
let time = ref(moment().format("YYYY年MM月DD日 hh:mm:ss"));
</script>

<template>
  <div class="top">
    <div class="left">
      <span class="left_btn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
    </div>
    <div class="right">
      <span class="right_btn">统计报告</span>
      <span class="time">当前时间 {{ time }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top {
  display: flex;
  height: 40px;
  width: 100%;
  color: #29fcff;
  .left {
    flex: 1;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    background-size: cover;
    .left_btn {
      float: right;
      width: 150px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url("../../images/dataScreen-header-btn-bg-l.png") no-repeat;
      background-size: 100% 100%;
      font-size: 20px;
    }
  }
  .center {
    width: 100%;
    flex: 2;
    .title {
      height: 74px;
      background: url("../../images/dataScreen-header-center-bg.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      font-size: 30px;
    }
  }
  .right {
    flex: 1;
    background: url("../../images/dataScreen-header-left-bg.png") no-repeat;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right_btn {
      width: 150px;
      height: 40px;
      background: url("../../images/dataScreen-header-btn-bg-r.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
    }
    .time {
      margin-left: 10px;
    }
  }
}
</style>
