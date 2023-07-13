<template>
  <div class="box8">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="图片" srcset="" />
    </div>
    <div class="charts" ref="charts" />
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const charts = ref();
onMounted(() => {
  echarts.init(charts.value);
  const option = {
    title: {
      text: "游客消费",
    },
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
    },
    radar: {
      // shape: "circle",
      indicator: [
        { name: "消费", max: 6500 },
        { name: "好感", max: 16000 },
        { name: "出行", max: 30000 },
        { name: "小吃", max: 38000 },
        { name: "爱好", max: 52000 },
        { name: "经典", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "购物",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "吃饭",
          },
        ],
      },
    ],
  };
  echarts.setOption(option);
});
</script>

<style scoped lang="scss">
.box8 {
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
}</style>
