<script setup lang="ts">
import { onMounted, ref } from "vue";
import { hasSKU, reqDeleteSku } from "@/api/product/sku";
import { skuRecord } from "@/api/product/sku/type.ts";
import { ElMessage } from "element-plus";
import { reqSpuInfo } from "@/api/product/spu";
import { SpuImage } from "@/api/product/spu/type.ts";

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
    ElMessage.warning(`${row.skuName}下架成功`);
  } else {
    row.isSale = 1;
    ElMessage.success(`${row.skuName}上架成功`);
  }
};

const imageList = ref<SpuImage[]>([]);
// 右侧抽的控制
const drawer = ref(true);
const drawerData = ref();
const drawerShow = async (row) => {
  let responseData = await reqSpuInfo(row.spuId as number);
  if (responseData.code == 200) {
    drawerData.value = responseData.data;
  } else {
    drawer.value = false;
  }
  drawer.value = true;
  drawerData.value.spuSaleAttrList.forEach((val) => {
    // console.log(val," val");
    if (drawerData.value.spuSaleAttrValueList == undefined)
      drawerData.value.spuSaleAttrValueList = [];
    drawerData.value.spuSaleAttrValueList.push(...val.spuSaleAttrValueList);
  });
  console.log(drawerData, "drawerData");
};
// const drawerShow = async (row) => {
//   // let responseData = await reqSpuImageList(row.id);
//   // let attrResponseData = await reqSpuHasSaleAttr(row.id);
//   const promiseAll = [
//     await reqSpuImageList(row.spuId),
//     await reqSpuHasSaleAttr(row.spuId),
//   ];
//   let responseData = await Promise.all(promiseAll);
//   console.log(responseData, "responseData");
//   responseData.map((value) => {
//     if (value.code != 200 || value.data.length == 0) drawer.value = false;
//     drawerData.value = row;
//     console.log(row, " row");
//     console.log('"inputText" in value.data[0]', "orId" in value.data[0]);
//     if ("imgUrl" in value.data[0]) {
//       // 在这里处理 data 对象
//       imageList.value = value.data;
//       console.log(imageList, "imageList");
//     } else if ("spuSaleAttrValueList" in value.data[0]) {
//       value.data.forEach((val) => {
//         if ("spuSaleAttrValueList" in val) {
//           if (drawerData.value.skuSaleAttrValueList == undefined)
//             drawerData.value.skuSaleAttrValueList = [];
//           drawerData.value.skuSaleAttrValueList.push(
//             ...val.spuSaleAttrValueList,
//           );
//         }
//       });
//       console.log(
//         drawerData.value.skuSaleAttrValueList,
//         "drawerData.value.skuSaleAttrValueList",
//       );
//     }
//   });
//   drawer.value = true;
//   drawerData.value = row;
//   // console.log(drawerData.value, "drawerData");
// };

const deleteSku = async (row) => {
  console.log(row);
  records.value.splice(row, 1);
  let response = await reqDeleteSku(row.spuId);
  if (response.code == 200) {
    await hasSkuData();
    ElMessage.success(`${row.skuName} 删除成功`);
  } else {
    ElMessage.error("doctor 发生不明原因的失败 阿酷乃兹(明日方舟)");
  }
};
</script>
<template>
  sku管理
  <div>
    <el-table border :data="records" :show-overflow-tooltip="true">
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
            @click="drawerShow(row)"
          ></el-button>
          <el-popconfirm
            title="Are you sure to delete this ?"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button size="small" icon="Delete" type="danger" />
            </template>
          </el-popconfirm>

          <el-drawer v-model="drawer">
            <template #header>
              <h2>查看商品详情</h2>
            </template>
            <template #default>
              <el-row>
                <el-col :span="6">名称</el-col>
                <el-col :span="18">{{ drawerData?.spuName }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">描述</el-col>
                <el-col :span="18">{{ drawerData?.description }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">价格</el-col>
                <el-col :span="18">{{ drawerData?.price }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18">
                  <el-tag
                    style="margin: 0 6px"
                    v-for="item in drawerData?.spuSaleAttrValueList"
                    :key="item.id"
                    type="danger"
                  >
                    {{ item.saleAttrValueName }}
                  </el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">销售属性</el-col>
                <el-col :span="18">
                  <el-tag
                    v-for="item in drawerData?.spuSaleAttrList"
                    :key="item.id"
                    type="success"
                  >
                    {{ item.saleAttrName }}
                  </el-tag>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">图片</el-col>
                <el-col :span="18">
                  <!--                  <img src="">-->
                  <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in imageList" :key="item?.id">
                      {{ item.imgUrl }}
                      <!--       TODO img不显示               <h3>{{ item }}</h3>-->
                      <img
                        :src="item.imgUrl"
                        :alt="item.imgName"
                        style="width: 100%; height: 100%"
                      />
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

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
