<script setup lang="ts">
import SpuForm from "@/views/product/spu/spuForm.vue";
import SkuForm from "@/views/product/spu/skuForm.vue";
import Category from "@/components/Category/index.vue";
import { ref, watch } from "vue";
import { useCategoryStore } from "@/store/module/category.ts";
import { reqHasSpu } from "@/api/product/spu";
import { Records, SpuData } from "@/api/product/spu/type.ts";
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
  console.log(categoryStore);
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
const spuForm = ref();

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
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Plus" />
              <!--              title="添加Spu"-->
              <el-button
                @click="updateSpu(row)"
                type="warning"
                size="small"
                icon="Edit"
              />
              <!--              title="修改Spu"-->
              <el-button type="info" size="small" icon="Search" />
              <!--              title[="查看SPU列表"-->
              <el-button type="danger" size="small" icon="Delete" />
              <!--              title="删除"-->
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
      <sku-form v-show="scene == 2"></sku-form>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
