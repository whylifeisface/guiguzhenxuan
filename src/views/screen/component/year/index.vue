<template>
  <div class="box7">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="图片" srcset="" />
    </div>
    <div class="charts" ref="lines" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const charts = ref();
onMounted(() => {
  echarts.init(charts.value);
  echarts.setOption({
    title: {
      text: "",
    },
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      show: false,
    },
    grid: {
      left: 0,
      bottom: 0,
    },
    series: [
      {
        type: "scatter",
        data: [11, 22, 33, 31, 32, 932, 3232, 44, 233, 2, 99, 343],
        symbol: "circle",
        symbolSize: 16,
        label: {
          show: true,
          position: "top",
          color: "yellowgreen",
        },
        itemStyle: {
          color: "canyon",
        },
      },
    ],
  });
});
</script>

<style scoped lang="scss">
.box7 {
  width: 100%;
  height: 100%;
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;
}

.charts {
  height: calc(100% - 40px);
}
</style>
