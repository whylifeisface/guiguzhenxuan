<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const charts = ref();
onMounted(() => {
  let eChartsType = echarts.init(charts.value);
  let option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      right: 20,
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "inside",
          color: "white",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "军事 " },
          { value: 735, name: "新闻" },
          { value: 580, name: "直播" },
          { value: 484, name: "娱乐 " },
          { value: 300, name: "财经 " },
        ],
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }, //调整图形位置
  };
  eChartsType.setOption(option);
});
</script>

<template>
  <div class="box2">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="图片" srcset="" />
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>

<style scoped lang="scss">
.box2 {
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  .title {
    p {
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
