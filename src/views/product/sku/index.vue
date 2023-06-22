<script setup lang="ts">
import { onMounted, ref } from "vue";
import { hasSKU } from "@/api/product/sku";
import { skuRecord } from "@/api/product/sku/type.ts";
import { ElMessage } from "element-plus";

const total = ref(0);
const pageSize = ref(3);
const pageNo = ref(1);

const records = ref<skuRecord[]>([]);
const hasSkuData = async () => {
  let responseData = await hasSKU(pageNo.value, pageSize.value);
  if (responseData.code == 200) {
    records.value = responseData.data.records;
    total.value = responseData.data.total;
    console.log(records.value, "records");
  } else {
    ElMessage.error("失败！ 请重试");
  }
};

//分页器当前页面修改回调
const currentChange = () => {
  hasSkuData();
};
//分页器当前个数修改回调

const sizeChange = () => {
  pageNo.value = 1;
};
onMounted(() => {
  hasSkuData();
});
//修改上架下价的按钮回调
const updateSaleHandler = (row) => {
  if (row.isSale == 1) {
    row.isSale = 0;
    ElMessage.success(`${row.skuName}下架成功`);
  } else {
    row.isSale = 1;
    ElMessage.success("${row.skuName}上架成功");
  }
};

// 右侧抽的控制
const drawer = ref(true);
const drawerShow = () => {
  drawer.value = drawer.value != false;
};
</script>
<template>
  sku管理
  <div>
    <el-table border :data="records">
      <el-table-column label="序号" type="index" align="center" width="80px" />
      <el-table-column label="名称" prop="skuName" />
      <el-table-column label="描述" prop="skuDesc" />
      <el-table-column label="默认图片">
        <template #default="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt="alt"
            style="width: 100%; height: 100%"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量" prop="weight" />
      <el-table-column label="价格(元)" prop="price" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            size="small"
            :icon="row.isSale == 1 ? `Bottom` : `Top`"
            :type="row.isSale == 1 ? `success` : `info`"
            @click="updateSaleHandler(row)"
          ></el-button>
          <el-button size="small" icon="Edit" type="primary"></el-button>
          <el-button
            size="small"
            icon="Search"
            type="info"
            @click="drawerShow"
          ></el-button>
          <el-button size="small" icon="Delete" type="danger" />
          <el-drawer v-model="drawer" :with-header="false">
            <template #header>
              <h2>查看商品详情</h2>
            </template>
            <template #default>
              <el-row>
                <el-col :span="6">名称</el-col>
                <el-col :span="18"></el-col>
              </el-row>
              <el-row>
                <el-col :span="6">描述</el-col>
                <el-col :span="18"></el-col>
              </el-row>
              <el-row>
                <el-col :span="6">价格</el-col>
                <el-col :span="18"></el-col>
              </el-row>
              <el-row>
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18"></el-col>
              </el-row>
              <el-row>
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18">
                  <el-tag v-for="item in 18" :key="item" type="danger">
                    {{ item }}
                  </el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">销售属性</el-col>
                <el-col :span="18">
                  <el-tag v-for="item in 18" :key="item" type="success">
                    {{ item }}
                  </el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18">
                  <!--                  <img src="">-->
                  <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in 6" :key="item">
                      <h3>{{ item }}</h3>
                    </el-carousel-item>
                  </el-carousel>
                </el-col>
              </el-row>
            </template>
          </el-drawer>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      layout="prev,pager,next,jumper,->,sizes,total"
      v-model:total="total"
      page-sizes="[10,20,30,100]"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<style scoped lang="scss"></style>