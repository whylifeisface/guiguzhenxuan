<script setup lang="ts">
import {
  HasSaleAttr,
  SaleAttrs,
  SaleAttrValue,
  SpuData,
  SpuImage,
} from "@/api/product/spu/type.ts";
import {
  reqAddOrUpdateSpu,
  reqAllSaleAttr,
  reqAllTradeMark,
  reqSpuHasSaleAttr,
  reqSpuImageList,
} from "@/api/product/spu";
import { TradeMark } from "@/api/product/trademark/type.ts";
import { computed, ref } from "vue";
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
const saleAttr = ref<SaleAttrs[]>([]);
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
  // 初始化数据的同时把是否显示 有多少条数据就有多少个flag 那么addAttr成功也要增加
  saleAttr.value.map(() => {
    flagList.value.push({ flag: true });
  });
  // console.log(saleAttr.value, "saleAttr.value");
  allSaleAttr.value = allSale.data;
  imageList.value = spuHasImage.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
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

const save = async () => {
  //整理参数
  // 照片墙的数据
  spuParams.value.spuImageList = imageList.value.map((item) => {
    return {
      imgName: item.name,
      imgUrl: item.url,
    };
  });
  spuParams.value.spuSaleAttrList = saleAttr.value;
  // console.log("spuParams", spuParams);
  // 发请求:添加或是修改SPU
  const result = await reqAddOrUpdateSpu(spuParams.value);
  if (result.code == 200) {
    ElMessage.success(spuParams.value.id ? "更新成功" : "添加成功");
    // 通知父组件切换为场景0
    $emit("changeScene", 0);
  } else ElMessage.error(spuParams.value.id ? "更新失败" : "添加失败");
};

//添加一个新的SPU初始化请求方法
const initAddSpu = async () => {
  let allTradeMark = await reqAllTradeMark();
  let hasSaleAttr = await reqAllSaleAttr();
  AllTradeMark.value = allTradeMark.data;
  allSaleAttr.value = hasSaleAttr.data;
};
//添加属性值按钮
const addAttrValue = () => {
  let [baseSaleAttrId, saleAttrName] = sale.value.split(":");
  saleAttr.value.push({
    baseSaleAttrId: baseSaleAttrId as number,
    saleAttrName: saleAttrName,
    spuSaleAttrValueList: [],
  });
  flagList.value.push({ flag: true });
  sale.value = "";
};

const unSelectSaleAttr = computed(() => {
  // console.log("allSaleAttr", allSaleAttr.value);
  // console.log("saleAttr", saleAttr.value);
  // console.log(a);
  return allSaleAttr.value.filter((item) => {
    // console.log(item);
    return saleAttr.value.every((other) => {
      // console.log(other);
      return item.name != other.saleAttrName;
    });
  });
});
const sale = ref("");

const toEdit = ($index) => {
  // console.log(spuParams.value);
  // console.log(flagList);
  flagList.value[$index].flag = false;
  flagList.value[$index].content = "";
  // console.log("flag", flagList[$index].flag);
};

// 添加销售属性值tag input框绑定的值
// const InputText = ref("");
const blurFu = (list, $index) => {
  //校验输入内容合法性  不能为空  不能重复
  //合法则加入param
  // console.log(spuParams);
  if (flagList.value[$index].content?.trim() == "") {
    ElMessage.warning("请输入内容");
    return;
  }
  const repeat = saleAttr.value[$index].spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName == flagList.value[$index].content;
  });
  if (repeat) {
    ElMessage.warning("内容不能重复，请重新输入");
    return;
  }
  console.log(saleAttr.value[$index].spuSaleAttrValueList, "list");
  //TODD spuParams.value.spuSaleAttrList null error
  const { spuId, baseSaleAttrId, saleAttrName } = list;
  const value = JSON.parse(JSON.stringify(flagList.value));
  saleAttr.value[$index].spuSaleAttrValueList.push({
    spuId,
    baseSaleAttrId,
    saleAttrName,
    saleAttrValueName: value[$index].content,
  });
  flagList.value[$index].flag = true;
};

// input 框显示content内容 //flag 标志位表示到底是编辑模式 还是 查看模式.
const flagList = ref<{ content?: string; flag: boolean }[]>([]);

defineExpose({ initHasSpuData, initAddSpu });
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
        <el-select
          v-model="sale"
          :placeholder="
            unSelectSaleAttr.length == 0
              ? `无`
              : `还未选择${unSelectSaleAttr.length}个`
          "
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          />
        </el-select>
        <el-button
          :disabled="sale == ''"
          style="margin-left: 10px"
          type="primary"
          icon="Plus"
          @click="addAttrValue"
        >
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
            <template #default="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-button
                v-if="flagList[$index].flag"
                type="primary"
                size="small"
                width="120px"
                icon="Plus"
                @click="toEdit($index)"
              />
              <el-input
                v-else
                v-model="flagList[$index].content"
                size="small"
                placeholder="请你输入属性值"
                style="width: 100px"
                @blur="blurFu(row, $index)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ $index }">
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
          <el-button
            type="primary"
            @click="save"
            :disabled="
              spuParams.spuSaleAttrList != null &&
              spuParams.spuSaleAttrList?.length > 0
            "
          >
            保存
          </el-button>
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