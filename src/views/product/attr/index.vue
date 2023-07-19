<script setup lang="ts">
import Category from "@/components/Category/index.vue";
import { useCategoryStore } from "@/store/module/category.ts";
import { watch, ref, reactive, nextTick, onBeforeMount } from "vue";
import { reqAddOrUpdateAttr, reqAttr, reqRemoveAttr } from "@/api/product/attr";
import { Attr, AttrList } from "@/api/product/attr/type.ts";
import { ElMessage, InputInstance } from "element-plus";

const categoryStore = useCategoryStore();

//存取table已有的属性和属性值
const attrArr = ref<AttrList>([]);

const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore;
  const result = await reqAttr(c1Id as number, c2Id as number, <number>c3Id);
  if (result.code == 200) attrArr.value = result.data;
  else console.log(result.message);
};

//监听三级分类id 一旦变化就获取数据
watch(
  () => categoryStore.c3Id,
  () => {
    attrArr.value = [];
    //确保三级分类id存在
    if (!categoryStore.c3Id) return;
    getAttr();
  },
);

//控制卡片内容的切换
let scene = ref(0); // 0展示数据页 1展示修改页
//添加属性按钮回调方法 切换 1展示修改页
const addAttr = () => {
  //先清空数据 再收集数据
  Object.assign(attrParam, {
    attrName: "", //新增属性名
    attrValueList: [], //新增属性数组
    categoryId: "", //三级分类Id
    categoryLevel: 3, //代表的是三级分类
  });

  scene.value = 1;
  nextTick(() => elInput.value?.focus());
};
//table中修改按钮回调
const updateAttr = (row: any) => {
  scene.value = 1;
  //将已有的属性赋值给attrParam 浅拷贝 只是对象的应用 会使取消修改 数据库没改 前端数据修改了
  Object.assign(attrParam, JSON.parse(JSON.stringify(row)));
};
// 修改页面的取消按钮回调
const cancel = () => {
  scene.value = 0;
};
const inputArr: { focus: () => void; }[] = [];
//收集新增的属性的数据
let attrParam = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
  orId: ""
});

const addAttrTable = () => {
  attrParam.attrValueList.push({ valueName: "", flag: true });
  nextTick(() => {
    //每次添加聚焦最后一个
    inputArr[attrParam.attrValueList.length - 1].focus();
  });
};
//新增和修改时候的保存按钮
//
const save = async () => {
  attrParam.attrValueList.map((value) => {
    value.attrId = categoryStore.c3Id as number;
  });
  const result = await reqAddOrUpdateAttr(attrParam);
  if (result.code == 200) {
    scene.value = 0;
    ElMessage.success(attrParam.id ? "修改成功" : "属性添加成功");
    await getAttr();
  } else {
    ElMessage.error(attrParam.id ? "修改失败" : "属性添加失败");
  }
};
//定义一个响应式的数据控制 form input 编辑模式
//表单失去焦点回调
const toLook = (row: { flag: boolean; valueName: string; }, $index: number) => {
  row.flag = false;
  //过滤条件1 什么都没输入就删除对应的input 防止div 高度为0 无法进入编辑模式
  if (row.valueName.trim() == "") {
    attrParam.attrValueList.splice($index, 1);
  }
  //过滤条件二 重复值拒绝添加
  attrParam.attrValueList.find((value, index) => {
    if (
      value.valueName == row.valueName &&
      index != attrParam.attrValueList.length - 1
    ) {
      ElMessage.warning(`${value.valueName}已经存在`);
      attrParam.attrValueList.splice($index, 1);
    }
  });
};
//属性值div点击事件
const toEdit = (row: any, $index: number) => {
  row.flag = true;
  //v-else 切换结束就聚焦input
  nextTick(() => {
    inputArr[$index].focus();
  });
};

const elInput = ref<InputInstance>();
const deleteAttr = async () => {
  let result = await reqRemoveAttr(categoryStore.c3Id as number);
  if (result.code == 200) {
    ElMessage.success("删除成功");
    //重新获取属性和属性值
    await getAttr();
  } else {
    ElMessage.error("删除失败");
    console.log(result.data);
  }
};

const deleteArray = (index: number) => {
  attrParam.attrValueList.splice(index, 1);
};
//路由销毁的时候把store清空
onBeforeMount(() => {
  categoryStore.$reset();
});
</script>

<template>
  <div class="card-top">
    <Category :scene="scene" />
  </div>
  <div>
    <el-card class="card-bottom">
      <div v-if="scene == 0">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">
          添加属性
        </el-button>
        <el-table border :data="attrArr">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <el-tag style="margin: 5px" v-for="item in row.attrValueList" :key="item.id">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="{ row }">
              <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>
              <el-popconfirm :title="`你确定要删除${row.attrName}吗`" width="200px" @confirm="deleteAttr">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else-if="scene == 1">
        <!-- 把item切换为行内样式 -->
        <!--        TODO input 不显示  Invalid vnode type when creating vnode: undefined. -->
        <div>
          <el-form :inline="true">
            <el-form-item label="属性名称">
              <input type="text" v-model="attrParam.attrName" placeholder="请输入名称" />
            </el-form-item>
          </el-form>
        </div>
        <el-button type="primary" @click="addAttrTable" icon="Plus" :disabled="!attrParam.attrName">
          添加属性
        </el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-table border style="margin: 10px 0" :data="attrParam.attrValueList">
          <el-table-column label="序号" width="80px" type="index" align="center"></el-table-column>
          <el-table-column label="属性名称">
            <!--            row wei attrParam.attrValueList[$index] -->
            <template #default="{ row, $index }">
              <input v-if="row.flag" placeholder="请你输入属性值名称" v-model="row.valueName" :ref="(v) => (inputArr[$index] = v)"
                @blur="toLook(row, $index)" />
              <div @click="toEdit(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值">
            <template #default="{ $index }">
              <el-button type="danger" @click="deleteArray($index)" icon="Delete"></el-button>
            </template>
          </el-table-column>
          <el-button type="primary" @click="save" icon="Plus">保存</el-button>

          <el-button type="primary" @click="cancel">取消</el-button>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.card-top {}

el-table {
  margin-top: 10px;
}

.card-bottom {
  margin-top: 10px;
}
</style>
