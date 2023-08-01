<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  reqHasTrademark,
  reqAddOrUpdateTradeMark,
  reqDeleteTrademark,
} from "@/api/product/trademark";
import type {
  Records,
  ResponseProduct,
  TradeMark,
} from "@/api/product/trademark/type";
import { ElMessage, FormInstance, FormRules, UploadProps } from "element-plus";

//获得当前页面的数据 page 当前页面 size 要几个数据
async function get_Trademark() {
  let result: ResponseProduct = await reqHasTrademark(
    page_now.value,
    page_size.value,
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
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

//收集表单品牌数据
let tradeMarkParam = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
const DialogFormVisibility = ref(false);

// dialog title 值 添加 | 修改
const title = ref("添加");

// 修改之前把数据从table里面获取了 从data里面copy
const updateTradeMark = async (data: TradeMark) => {
  //清空form校验错误提示信息

  formRef.value?.clearValidate("tmName");
  formRef.value?.clearValidate("logoUrl");
  console.log(data);
  title.value = "修改";
  DialogFormVisibility.value = true;
  Object.assign(tradeMarkParam, data);
};
// 收集数据之前清空数据
const addTradeMark = () => {
  title.value = "添加";
  tradeMarkParam.id = 0;
  tradeMarkParam.tmName = "";
  tradeMarkParam.logoUrl = "";
  // formRef.value 为undefine  两种解决 ? 或者 在nextTick里面
  formRef.value?.clearValidate("tmName");
  formRef.value?.clearValidate("logoUrl");

  DialogFormVisibility.value = true;
};

//对话框底部 取消按钮
const cancel = () => {
  DialogFormVisibility.value = false;
};
//对话框底部 确定按钮 修改或者添加品牌 修改留在当前页面
const confirm = async () => {
  await formRef.value?.validate();
  let result = await reqAddOrUpdateTradeMark(tradeMarkParam);
  console.log(result);
  if (result.code == 200) {
    ElMessage.success(`${title.value}成功`);
    page_now.value = 1;
    changePageNo();
  } else {
    ElMessage.error(`${title.value}失败`);
  }

  DialogFormVisibility.value = false;
};
//上传图片之前的钩子函数  可以用来约束文件类型和大小
// 要求 格式必须是 gpg png gif  小于4MB
const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  // console.log(rawFile);
  if (
    rawFile.type != "image/jpeg" &&
    rawFile.type != "image/png" &&
    rawFile.type != "image/gif"
  ) {
    ElMessage.error({ message: "文件必须是图片" });
    return false;
  }
  if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error({ message: "文件大于4MB" });
    return false;
  }
  return true;
};

const OnUploadSuccess: UploadProps["onSuccess"] = (response) => {
  tradeMarkParam.logoUrl = response.data;
  formRef.value?.clearValidate("logoUrl");
};
// tmName 校验规则  表单元素blur 时触发  需要tmName 长度大于2
const validatorTmName = (
  _: unknown,
  value: any,
  callback: (error?: string | Error) => void,
) => {
  value.trim().length >= 2
    ? callback()
    : callback(new Error("品牌名称需要大于2位"));
};
const formRef = ref<FormInstance>();
const validatorLogoUrl = (
  _: unknown,
  value: any,
  callback: (error?: string | Error) => void,
) => {
  value ? callback() : callback(new Error("请先上传文件"));
};
// 表单校验规则
const rules: FormRules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  //不是表单元素 不方便触发 在formRef validator中触发  validator会出现提示信息没有去除成功
  logoUrl: [{ required: true, trigger: "change", validator: validatorLogoUrl }],
};

//删除tradmark button
const removeTrademark = async (id: number) => {
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除品牌成功",
    });
    await get_Trademark();
  } else {
    ElMessage.error("删除品牌成功");
  }
};
</script>

<template>
  <div>
    <h1>品牌管理</h1>
    <el-card>
      <div>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          @click="addTradeMark"
        >
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
                <!--                TODO    图片太大-->
                <img
                  :src="row.logoUrl"
                  alt="图片不存在"
                  style="width: 100px; height: 100px"
                />
              </template>
            </el-table-column>
            <el-table-column label="品牌操作">
              <template #default="{ row }">
                <el-button
                  type="warning"
                  size="small"
                  icon="Edit"
                  @click="updateTradeMark(row)"
                >
                  编辑
                </el-button>
                <el-popconfirm
                  :title="`您确定要删除${row.tmName}`"
                  width="250px"
                  icon="Delete"
                  @confirm="removeTrademark(row.id)"
                >
                  <template #reference>
                    <el-button type="danger" size="small" icon="Delete">
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
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

  <div>
    <!--    对话款组件在添加和修改时出现
        是否显示
        左上角标题
-->
    <el-dialog v-model="DialogFormVisibility" :title="`${title}品牌`">
      <el-form
        style="width: 80%"
        :rules="rules"
        :model="tradeMarkParam"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            type="text"
            v-model="tradeMarkParam.tmName"
            placeholder="请输入品牌名称"
          />
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--
            action: 请求的url-->
          <el-upload
            class="upload-class"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="OnUploadSuccess"
          >
            <img
              :src="tradeMarkParam.logoUrl"
              v-if="tradeMarkParam.logoUrl"
              alt=""
            />
            <el-icon v-else class="plus">
              <Plus></Plus>
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!--        底部取消确定按钮-->
      <template #footer>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.bannerTable {
  margin-top: 20px;
}

.upload-class {
  width: 178px;
  height: 178px;
  border: black dashed 1px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;

  .plus {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
}
</style>
