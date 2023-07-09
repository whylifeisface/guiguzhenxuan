<script setup lang="ts">
import { ref, onMounted } from "vue"; 
import Top from "./component/top/index.vue";
import Age from "./component/age/index.vue";
import Tourist from "./component/tourist/index.vue";
import Sex from "./component/sex/index.vue";
// 中间
import Map from "./component/map/index.vue";
import Line from "./component/line/index.vue";
//右侧
import Rank from "./component/rank/index.vue";
import Year from "./component/year/index.vue";
import Couter from "./component/couter/index.vue";

// 数据大屏组件
const screen = ref();
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
});

// 定义大屏缩放比例
const getScale = (w = 1920, h = 1080) => {
  const ww = window.innerWidth / w;
  const wh = window.innerHeight / h;
  return ww < wh ? ww : wh;
};
// 监听视口变化 当页面大小变化时使用getScale
</script>

<template>
  <!--  <div>我是数据大屏</div>-->
  <div class="container">
    <!--    数据大屏内容区域-->
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="tourish" />
          <Sex class="Sex" />
          <Age class="Age" />
        </div>
        <div class="center">
          <Map />
          <Line />
        </div>
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background: url("./images/bg.png") no-repeat;
  background-size: cover;

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }
    .bottom {
      display: flex;
      //justify-content: space-between;
      .right {
        flex: 1;
      }

      .left {
        display: flex;
        flex-direction: column;
        flex: 1;
        //height: 1040px;
        .tourish {
          flex: 1.5;
        }
        .Sex {
          flex: 1;
        }
        .Age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
      }
      .right {
        display: flex;
        flex-direction: column;
        .rank {
          flex: 1;
        }
        .year {
          flex: 1;

        }
        .couter {
          flex: 1;
        }
      }
    }
  }
}
</style>
