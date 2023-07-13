<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const line = ref();
onMounted(() => {
  let eChartsType = echarts.init(line.value);
  eChartsType.setOption({
    title: { text: "fwl" },
    xAxios: {
      type: "category",
      boundGap: false,
      splitLine: {
        show: false,
      },
      data: ["zhouy 1", " 2", "3", "4", "5", "6", "7"],
    },
    yAxios: {
      splitLine: {
        show: false,
      },
      axiosLine: {
        show: true,
      },
      axiosTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      right: 0,
      top: 10,
      bottom: 0,
    },
    series: [
      {
        type: "line",
        data: [10, 50, 6, 8],
        smooth: true,
        areaStyle: {
          color: "red",
        },
      },
    ],
  });
});
</script>

<template>
  <div class="box5">
    <div class="title">
      <p>wei lai qi tian</p>
      <img src="../../images/dataScreen-title.png" alt="图片" srcset="" />
    </div>
    <div class="charts" ref="lines" />
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .title {
  }

  .charts {
    height: calc(100% - 40px);
  }
}
</style>
