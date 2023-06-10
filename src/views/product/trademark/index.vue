<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqHasTrademark } from "@/api/product/trademark";

//获得当前页面的数据 page 当前页面 size 要几个数据
async function get_Trademark() {
  await reqHasTrademark(page_now.value, page_size.value);
}
onMounted(() => {
  get_Trademark();
});
let page_now = ref(1);
let page_size = ref(3);
const page_sizes = [];
const total = 10;
</script>

<template>
  <div>
    <h1>品牌管理</h1>
    <el-card>
      <div>
        <el-button type="primary" size="default" icon="Plug">
          添加品牌
        </el-button>
        <div class="bannerTable">
          <!--          表格组件 用来展示数据
                        data 数据 border 是否显示边框

                        colum
                        width
                        label 标题
                        align 位置
           -->
          <el-table data="" border>
            <el-table-column
              width="80"
              label="序号"
              align="center"
            ></el-table-column>
            <el-table-column label="品牌名称"></el-table-column>
            <el-table-column label="品牌logo"></el-table-column>
            <el-table-column label="品牌操作"></el-table-column>
          </el-table>
        </div>

        <div>
          <!--          分页器
                pagination
                current-page:设置当前页码
                page-size: 设置当前显示多少页
                page-sizes:设置下拉菜单的数据 type array 前往第多少页
                layout: 调整子组件的布局 -> 表示把后面组件顶到右边
          -->
          <el-pagination
            :total="total"
            v-model:current-page="page_now"
            v-model:page-size="page_size"
            :page-sizes="page_sizes"
            layout="prev,pager,next,jumper,->,sizes,total"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.bannerTable {
  margin-top: 20px;
}
</style>
