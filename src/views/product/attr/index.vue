<script setup lang="ts">
import Category from "@/components/Category/index.vue";
import { useCategoryStore } from "@/store/module/category.ts";
import { watch, ref, reactive } from "vue";
import { reqAttr } from "@/api/product/attr";
import { Attr, AttrList } from "@/api/product/attr/type.ts";
const categoryStore = useCategoryStore();

//存取table已有的属性和属性值
const attrArr = ref<AttrList>([]);

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  const result = await reqAttr(c1Id as number, c2Id as number, <number>c3Id);
  if (result.code == 200) attrArr.value = result.data;
   else console.log(result.message);
};

//监听三级分类id 一旦变化就获取数据
watch(() => categoryStore.c3Id,() => {
  attrArr.value = []
  //确保三级分类id存在
  if (!categoryStore.c3Id) return;
    getAttr()
});

//控制卡片内容的切换
let scene = ref(0); // 0展示数据页 1展示修改页
//添加属性按钮回调方法 切换 1展示修改页
const addAttr = () => {
  scene.value = 1;
}
//table中修改按钮回调
const updateAttr = () => {
  scene.value = 1;

}
// 修改页面的取消按钮回调
const cancel = () => {
  scene.value = 0;
}

//收集新增的属性的数据
let attrParam = reactive<Attr>({
  attrName:"",  //新增属性名
  attrValueList: [],  //新增属性数组
  categoryId: "",  //三级分类Id
  categoryLevel: 3, //代表的是三级分类
})
</script>

<template>
  <div class="card-top">
    <Category :scene="scene"/>
  </div>
  <div>
    <el-card class="card-bottom">
      <div v-if="scene==0">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">
          添加属性
        </el-button>
        <el-table border :data="attrArr">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{row}">
              <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{row}">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr"></el-button>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <!--        把item切换为行内样式-->
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input placeholder="请你输入属性名称" />
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="" icon="Plus">添加属性值</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table border style="margin:10px 0">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性名称"></el-table-column>
          <el-table-column label="属性值"></el-table-column>
          <el-button type="primary" @click="" icon="Plus">保存</el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-top {
}
el-table {
  margin-top: 10px;
}
.card-bottom {
  margin-top: 10px;
}
</style>
