<script setup lang="ts">
import SpuForm from "@/views/product/spu/spuForm.vue";
import Category from "@/components/Category/index.vue";
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/module/category";
import { reqDelete, reqHasSpu, reqSkuInfo } from "@/api/product/spu";
import { Records, SkuData, SpuData } from "@/api/product/spu/type";
import { ElMessage } from "element-plus";
//场景数据控制Category显示
const scene = ref(1); // 0 显示   1 添加或修改 2 添加SKU结构
let pageNo = ref(1);
let pageSize = ref(3);
const total = ref(0);
const categoryStore = useCategoryStore();
//监听三级分类Id变化
watch(
  () => categoryStore.$state.c3Id,
  () => {
    //监听变化 但是要categoryStore.c3Id有值
    if (!categoryStore.$state.c3Id) return;
    getHasSpu();
  },
);
const getHasSpu = async () => {
  // console.log(categoryStore, "categoryStore");
  const result = await reqHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.$state.c3Id as number,
  );
  if (result.code == 200) {
    record.value = result.data.records;
    total.value = result.data.total;
  } else console.log(result.message);
};

let record = ref<Records>([]);
//获取某一个三级分类下全部已有的Spu

//f分页器下拉菜单发生变化 发请求
const changeSize = () => {
  pageNo.value = 1;
  getHasSpu();
};
//添加新SPU按钮的回调
const addScene = () => {
  scene.value = 1;
  spuForm.value.initAddSpu();
};
//子组件SPUForm 绑定自定义事件： 目前是让子组件通知父组件切换场景0
const changeScene = (num: number) => {
  //子组件SPUForm 点击取消变为场景0
  scene.value = num;
};

//修改SPU按钮回调
const updateSpu = (row: SpuData) => {
  scene.value = 1;
  //调用子组件实例方法获取完整的SPU
  spuForm.value.initHasSpuData(row);
};

const addSku = (row: SpuData) => {
  scene.value = 2;
  skuForm.value.initSkuData(
    categoryStore.$state.c1Id as number,
    categoryStore.$state.c2Id as number,
    row,
  );
  // console.log(2);
};
// sku子组件修改父组件scene为0
const changeSkuScene = () => {
  scene.value = 0;
};

const skuInfo = ref<SkuData[]>([]);
//展示SKU的dialog按钮
const SkuInfo = async (row: SpuData) => {
  console.log("row", row);
  dialogVisibility.value = true;
  let responseData = await reqSkuInfo(row.id as number);
  if (responseData.code == 200) {
    skuInfo.value = responseData.data;
    console.log(responseData.data, "responseData.data");
  } else {
    console.log("error");
  }
};

//删除按钮回调
const deleteBtn = async (row: SpuData, $index: number) => {
  // console.log("row", row);
  if (row.id == undefined) {
    ElMessage.error("null");
    return;
  }
  let response = await reqDelete(row.id);
  if (response.code == 200) {
    ElMessage.success("删除成功");
    record.value.splice($index, 1);
  } else ElMessage.error(response.message + "  删除失败");
};

const dialogVisibility = ref(false);
const spuForm = ref();
const skuForm = ref();
</script>

<template>
  <div>
    <!--    三级分类-->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <!--      v-if v-show都可以实现显示与隐藏-->
      <div v-show="scene == 0">
        <el-button
          @click="addScene"
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.$state.c3Id"
        >
          添加SPU
        </el-button>
        <el-table style="margin: 10px 0" border :data="record">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          />
          <el-table-column label="SPU名称" prop="spuName" />
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          />
          <el-table-column label="操作">
            <template #default="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                @click="addSku(row)"
              />
              <!--              title="添加Spu"-->
              <el-button
                @click="updateSpu(row)"
                type="warning"
                size="small"
                icon="Edit"
              />
              <!--              title="修改Spu"-->
              <el-button
                type="info"
                size="small"
                icon="Search"
                @click="SkuInfo(row)"
              />
              <!--              title[="查看SPU列表"-->
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteBtn(row, $index)"
              />
              <!--              title="删除"-->
              <el-dialog v-model="dialogVisibility">
                <template #title>
                  <h1>SKU列表</h1>
                </template>
                <el-table border :data="skuInfo">
                  <el-table-column
                    label="sku名字"
                    prop="skuName"
                  ></el-table-column>
                  <el-table-column
                    label="sku价格"
                    prop="price"
                  ></el-table-column>
                  <el-table-column
                    label="sku重量"
                    prop="weight"
                  ></el-table-column>
                  <!-- //TODO http://47.93.148.192:8080/group1/M00/02/DA/rBHu8mGxPb-AQOTXAAAWgQNuXx0990.jpg 不显示-->
                  <el-table-column label="sku图片">
                    <template #default="{ row }">
                      {{ row.imgUrl }}
                      <img
                        :src="row.imgUrl"
                        alt="alt"
                        style="width: 100%; height: 100%"
                      />
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev,pager,next,jumper,->,sizes,total"
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :total="total"
          @current-change="getHasSpu()"
          @size-change="changeSize"
        />
      </div>
      <SpuForm
        ref="spuForm"
        v-show="scene == 1"
        @changeScene="changeScene"
      ></SpuForm>
      <sku-form
        v-show="scene == 2"
        ref="skuForm"
        @changeSkuScene="changeSkuScene"
      ></sku-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
