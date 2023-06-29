<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
//水球图拓展插件
import "echarts-liquidfill";

const charts = ref();
onMounted(() => {
  //获取实例
  let myCharts = echarts.init(charts.value);
  //设置实例的配置项
  myCharts.setOption({
    title: { text: "水球图" },
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: "liquidFill",
        data: [0.6, 0.4],
        waveAnimation: true,
        radius: "100%",
        outline: {
          show: true,
          borderColor: "yellowGreen",
          itemStyle: {
            color: "red",
          },
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  });
});

let people = ref("1080");
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span class="">999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">
        {{ item }}
      </span>
    </div>
    <!--    echarts 展示-->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box {
  margin-top: 20px;
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;

  .top {
    color: white;

    .title {
      font-size: 20px;
      //margin-left: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background-size: 100% 100%;
      background: url("../../images/dataScreen-title.png");
    }

    .right {
      float: right;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    //background: ;
    margin-top: 20px;
    display: flex;
    padding: 0 10px;

    span {
      flex: 1;
      height: 40px;
      background: url("../../images/total.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
    }
  }

  .charts {
    width: 100%;
    height: 230px;
  }
}
</style>