<script setup lang="ts">
import {
  reqSkuDataSave,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from "@/api/product/spu";
import { SkuData, SpuData } from "@/api/product/spu/type.ts";
import { reqAttr } from "@/api/product/attr";
import { onBeforeUnmount, reactive, ref, unref } from "vue";
import { ElMessage, TableInstance } from "element-plus";

const skuData = reactive<SkuData>({
  category3Id: 0,
  price: 0,
  skuDefaultImg: "",
  skuName: "",
  skuSaleAttrValueList: [],
  spuId: 0,
  tmId: 0,
  weight: "",
});
const initSkuData = async (c1Id: number, c2Id: number, sku: SpuData) => {
  //收集数据
  skuData.category3Id = sku.category3Id as number;
  skuData.spuId = sku.id as number;
  skuData.tmId = sku.tmId;
  // console.log("sku", sku);
  // console.log("initSkuData");
  const imageListResponseData = await reqSpuImageList(sku.id as number);
  if (imageListResponseData.code == 200)
    imageList.value = imageListResponseData.data;

  //属性列表 el-option
  let attrResponseData = await reqAttr(c1Id, c2Id, sku.category3Id as number);
  if (attrResponseData.code == 200) attrList.value = attrResponseData.data;
  //销售属性
  let saleAttrResponseData = await reqSpuHasSaleAttr(sku.id as number);
  if (saleAttrResponseData.code == 200)
    // console.log("saleAttrResponseData", saleAttrResponseData.data);
    saleAttrList.value = saleAttrResponseData.data;
};

const imageList = ref([]);
const attrList = ref([]);
const saleAttrList = ref([]);
const $emit = defineEmits(["changeSkuScene"]);

const cancel = () => {
  $emit("changeSkuScene", 0);
};

const tidyAttr = () => {
  attrList.value.map((value) => {
    if (value.orId) {
      const [id, attrId] = value.orId.split(":");
      if (skuData.skuAttrValueList == undefined) {
        skuData.skuAttrValueList = [];
      }
      // console.log(skuData.skuAttrValueList, "skuAttrValueList");
      skuData.skuAttrValueList.push({
        attrId,
        valueId: id,
      });
    }
  });
  saleAttrList.value.map((value) => {
    if (value.orId) {
      const [id, baseSaleAttrId] = value.orId.split(":");
      if (skuData.skuSaleAttrValueList == undefined) {
        skuData.skuAttrValueList = [];
      }
      skuData.skuSaleAttrValueList?.push({
        saleAttrId: id,
        saleAttrValueId: baseSaleAttrId,
      });
    }
  });
};
const save = async () => {
  // 整理平台属性和销售属性
  tidyAttr();
  let data = unref(skuData);
  // console.log(data, "data");
  let response = await reqSkuDataSave(data);
  if (response.code == 200) ElMessage.success("成功");
  else ElMessage.error("失败 请稍后重试");
  $emit("changeSkuScene", 0);
};

//控制table实例用来控制全选全不选
const tableRef = ref<TableInstance>();
//table 修改默认按钮回调;
const changeDefaultImg = (row) => {
  console.log(tableRef.value, "tableRef");
  imageList.value.forEach((value) => {
    tableRef.value?.toggleRowSelection(value, false);
  });
  tableRef.value?.toggleRowSelection(row, true);
};

defineExpose({ initSkuData });
//TODO 清除
onBeforeUnmount(() => {

})
</script>

<template>
  <!--  <h1>添加SKU</h1>-->
  <el-form label-width="100px">
    <el-form-item label="sku名称">
      <el-input type="text" placeholder="SKU名称" v-model="skuData.skuName" />
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input type="text" placeholder="价格(元)" v-model="skuData.price" />
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input type="text" placeholder="重量(克)" v-model="skuData.weight" />
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input
        type="textarea"
        placeholder="sku描述"
        v-model="skuData.skuDesc"
      />
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline>
        <el-form-item>
          <div v-for="item in attrList" :key="item.id">
            <div>
              <span>{{ item.attrName }}</span>
              <el-select v-model="item.orId">
                <el-option
                  v-for="val in item.attrValueList"
                  :key="val.id"
                  :label="val.valueName"
                  :value="`${val.id}:${val.attrId}`"
                ></el-option>
              </el-select>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <div v-for="item in saleAttrList" :key="item.id">
        <div>
          <span>{{ item.saleAttrName }}</span>
          <el-select v-model="item.orId">
            <el-option
              :key="val.id"
              v-for="val in item.spuSaleAttrValueList"
              :value="`${val.id}:${val.baseSaleAttrId}`"
              :label="val.saleAttrValueName"
            ></el-option>
          </el-select>
        </div>
      </div>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table ref="tableRef" :data="imageList" border>
        <el-table-column type="selection" width="80px" align="center" />
        <el-table-column label="图片" prop="">
          <template #default="{ row }">
            <img
              :src="row.imgUrl"
              :alt="row.imgName"
              style="width: 100%; height: 100%"
            />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="success"
              size="small"
              @click="changeDefaultImg(row)"
            >
              默认图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
