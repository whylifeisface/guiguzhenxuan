<template>
        <div class="box6">
    <div class="title">
      <p>热门景区排行</p>
      <img src="../../images/dataScreen-title.png" alt="图片" srcset="" />
    </div>
    <div class="charts" ref="lines" />
  </div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
const charts = ref();
onMounted(() => {
    echarts.init(charts.value)
    echarts.setOption({
        title:  {
            text: "景区排行",
            left: "50%",
            textStyle: {
                color: "yellow",
                fontSize: 20
            },
            subtext: "各大景区的排行",
            subtextStyle: {
                color: "yellowgreen",
                fontSize: 16
            }
        },
        xAxis: {
            type: "category",
        },
        yAxis: {},
        grid: {
            left: 20,
            bottom: 20
        },
        series: [
            {
                type: "",
                data: [10,20,30,40,50,60],
                label: {    
                    show: true,
                    position: "top"
                },
                showBackground: true,
                backgroundStyle: {},
                itemStyle: {
                    borderRadius: 10,
                    color: function(data: any) {
                        let arr = ["red", "orange", "yellowgreen", "green", "purple", "hotpink", "skyblue"]
                        return arr[data.dataIndex]
                    },
                },
            }
        ]

    })
})
</script>
<style lang="scss">
.box6 {
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