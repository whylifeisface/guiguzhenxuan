<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqHasTrademark } from "@/api/product/trademark";
import type { Records, ResponseProduct } from "@/api/product/trademark/type.ts";

//获得当前页面的数据 page 当前页面 size 要几个数据
async function get_Trademark() {
  let result: ResponseProduct = await reqHasTrademark(
    page_now.value,
    page_size.value,
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
    // page_now.value = result.data.pages;
    // page_size.value = result.data.size;
  } else {
    console.log(result.message);
  }
}

onMounted(() => {
  get_Trademark();
});
let page_now = ref<number>(1);
let page_size = ref<number>(3);
const page_sizes = [1, 3, 5, 7];
let total = ref<number>(0);
let trademarkArr = ref<Records>([]);

// 当前页面改变 再一次发起请求
const changePageNo = () => {
  get_Trademark();
};
// 一页展示多少个数据改变    再一次发起请求     当前的页码可能已经不存在   要修改为1
const sizeChange = () => {
  page_now.value = 1;
  get_Trademark();
};
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
          <el-table :data="trademarkArr" border>
            <el-table-column
              type="index"
              width="80"
              label="序号"
              align="center"
            ></el-table-column>
            <el-table-column label="品牌名称" prop="tmName"></el-table-column>
            <el-table-column label="品牌logo">
              <template #default="{ row }">
                <img
                  :src="row.logoUrl"
                  alt="图片不存在"
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column label="品牌操作">
              <template #default>
                <el-button type="warning" size="small" icon="Edit">
                  编辑
                </el-button>
                <el-button type="danger" size="small" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div>
          <!--          分页器
                pagination
                current-page:设置当前页码
                page-size: 设置当前显示多少页
                page-sizes:设置下拉菜单的数据 type array 前往第多少页
                layout: 调整子组件的布局 -> 表示把后面组件顶到右边
                page-count 连续按钮个数
                current-change 分页器页面发生变化
                size-change
          -->
          <el-pagination
            :total="total"
            :page-count="9"
            v-model:current-page="page_now"
            v-model:page-size="page_size"
            :page-sizes="page_sizes"
            layout="prev,pager,next,jumper,->,sizes,total"
            @current-change="changePageNo"
            @size-change="sizeChange"
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