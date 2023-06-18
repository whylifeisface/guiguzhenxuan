<script setup lang="ts">
import {
  HasSaleAttr,
  SaleAttr,
  SpuData,
  SpuImage,
} from "@/api/product/spu/type.ts";
import {
  reqAllSaleAttr,
  reqAllTradeMark,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from "@/api/product/spu";
import { TradeMark } from "@/api/product/trademark/type.ts";
import { ref } from "vue";
import { ElMessage } from "element-plus";

const $emit = defineEmits(["changeScene"]);
// 点击取消按钮通知父组件切换
const cancel = () => {
  $emit("changeScene", 0);
};
//存取已有的SPU属性
const AllTradeMark = ref<TradeMark[]>([]);
//商品图片
const imageList = ref<SpuImage[]>([]);
//已有的SPU销售属性
const saleAttr = ref<SaleAttr[]>([]);
//全部的销售属性
const allSaleAttr = ref<HasSaleAttr[]>([]);

//照片墙
//存取已有的SPU对象
const spuParams = ref<SpuData>({
  category3Id: 0,
  description: "",
  spuImageList: [],
  spuName: 0,
  spuSaleAttrList: [],
  tmId: 0,
});
// const
const initHasSpuData = async (spu: SpuData) => {
  //spu 父组件传过来的已有spu属性 但是不完整
  spuParams.value = spu;
  //获取全部品牌数据
  const result = await reqAllTradeMark();
  //获取某一个品牌旗下全部售卖商品的图片
  let spuHasImage = await reqSpuImageList(spu.id as number);
  //获取已有的SPu销售属性的数据
  let saleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number);
  let allSale = await reqAllSaleAttr();
  // Promise.all()
  AllTradeMark.value = result.data;
  saleAttr.value = saleAttrResponseData.data;
  allSaleAttr.value = allSale.data;
  imageList.value = spuHasImage.data.map((item) => {
    return {
      name: item.imgName,
      url: item.url,
    };
  });
};
let dialogVisible = ref(false);

const dialogImageUrl = ref("");
//照片墙点击预览回调
const handlePictureCardPreview = (file) => {
  //弹出对话框展示超大图片
  dialogVisible.value = true;
  if (file.url != null) {
    dialogImageUrl.value = file.url;
  }
};

const handleRemove = () => {
  // imageList.value.splice();
};

//照片墙上传前回调 约束文件大小和样式
const beforeUpload = (file) => {
  if (
    file.type == "image/png" ||
    file.type == "image/jpeg" ||
    file.type == "image/gif"
  )
    return true;
  else ElMessage.error("文件要为照片类型");
  if (file.size / 1024 / 1024 < 3) return true;
  else ElMessage.error("文件大小要小于3M");
  return false;
};

//销售属性删除按钮回调
const deleteSaleAttr = (index: number) => {
  saleAttr.value.splice(index, 1);
};

defineExpose({ initHasSpuData });
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" v-model="spuParams.spuName" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="spuParams.tmId">
        <el-option
          v-for="item in AllTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入SPU描述"
        v-model="spuParams.description"
      />
    </el-form-item>
    <el-form-item label="SPU图片">
      <!--
      file-list
      action 上传接口地址
      list-type 预览回调     -->
      <el-upload
        class="fileUpload"
        v-model:file-list="imageList"
        action="/api/admin/product/fileUpload"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
        list-type="picture-card"
      >
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img
          :src="dialogImageUrl"
          title="preview image"
          style="width: 100%; height: 100%"
        />
      </el-dialog>
    </el-form-item>
    <el-form label-width="100px">
      <el-form-item label="SPU销售属性">
        <!--    TODO v-model    展示销售属性的下拉菜单-->
        <el-select>
          <el-option
            v-for="item in allSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-button style="margin-left: 10px" type="primary" icon="Plus">
          添加属性值
        </el-button>
        <el-table border style="margin: 10px 0" :data="saleAttr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          />
          <el-table-column
            v-model="spuParams.spuName"
            prop="saleAttrName"
            label="销售属性名称"
            width="100px"
          ></el-table-column>
          <el-table-column prop="spuSaleAttrValueList" label="销售属性值">
            <template #default="{ row }">
              <el-tag
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
              >
                <!--   TODO             @close=""-->
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button
                type="primary"
                size="small"
                width="120px"
                icon="Plus"
              ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ _, $index }">
              <el-button
                type="danger"
                icon="Delete"
                size="small"
                @click="deleteSaleAttr($index)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </el-form>
</template>

<style scoped lang="scss">
.fileUpload {
  width: 100px;
  height: 100px;
  border: grey dashed 1px;
  border-radius: 20px;
  //display: flex;
  //flex-direction: column;
}
</style>
