<script setup lang="ts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";

const charts = ref();
onMounted(() => {
  let chartsType = echarts.init(charts.value);
  chartsType.setOption({
    title: {
      text: "",
    },
    xAxis: {
      show: false,
    },
    yAxis: {
      show: false,
      type: "category",
    },
    series: [
      {
        type: "bar",
        data: [58],
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: 20,
        },
      },
      {
        type: "bar",
        data: [100],
        barWidth: 20,
        itemStyle: {
          color: "pink",
          borderRadius: 20,
        },
        barGap: "-100%",
        //调整女士纸条 使两者重合
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
</script>

<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="图片" srcset="" />
    </div>
    <div class="sex">
      <p class="man">
        <img src="../../images/man.png" />
      </p>
      <p class="woman">
        <img src="../../images/woman.png" />
      </p>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<style scoped lang="scss">
.box1 {
  background: url("../../images/dataScreen-main-lb.png") no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  color: white;

  .title {
    p {
      font-size: 20px;
    }
  }

  .sex {
    display: flex;
    justify-content: center;

    .man {
      display: flex;
      justify-content: center;
      margin: 20px;
      background: url("../../images/man-bg.png") no-repeat;
    }

    .woman {
      display: flex;
      justify-content: center;
      margin: 20px;
      background: url("../../images/woman-bg.png") no-repeat;
    }
  }

  .rate {
    display: flex;
    justify-content: space-evenly;
  }

  .charts {
    height: 100px;
  }
}
</style>
