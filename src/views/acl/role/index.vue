<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import {
  DeleteRoleRoleResponseData,
  hasRoleResponseData,
  PermissionListResponse, RoleAssignResponse,
  SaveRoleResponseData,
  searchRoleResponseData,
  UpdateRoleResponseData
} from "@/api/acl/role";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { PermissionNode, Role } from "@/api/user/type.ts";
import { useLayoutSettingStore } from "@/store/module/setting.ts";
import { Tree } from "element-plus/es/components/tree-v2/src/types";

//----------------------------------搜索按钮组件
let store = useLayoutSettingStore();
const keyword = ref("");
//搜索按钮回调
const searchHandler = async () => {
  pageNo.value = 1;
  let responseData = await searchRoleResponseData(
    pageNo.value,
    pageSize.value,
    keyword.value,
  );
  if (responseData.code == 200) {
    ElMessage.success("成功");
    records.value = [];
    records.value = responseData.data.records;
    total.value = responseData.data.total;
  } else {
    ElMessage.error("失败");
  }
};
//重置按钮回调
const reset = () => {
  store.$state.refresh = !store.$state.refresh;
};

const addRole = () => {
  Object.assign(role, {
    createTime: "",
    remark: null,
    roleName: "",
    updateTime: "",
  });
  //清空上一次的表单校验错误
  nextTick(() => {
    formRef.value?.clearValidate("roleName");
  });
  dialogVisibility.value = true;
};
//-----------------------------------------------table 组件属性
const records = ref<Role[]>([]);
//pagination 组件属性
const total = ref(0);
const pageNo = ref(1);
const pageSize = ref(3);
const hasRole = async () => {
  let responseData = await hasRoleResponseData(pageNo.value, pageSize.value);
  if (responseData.code == 200) {
    records.value = responseData.data.records;
    total.value = responseData.data.total;
    ElMessage.success("成功");
  } else {
    ElMessage.error("失败");
  }
};

//分配权限按钮回调
const RoleCommit = async (id) => {
  curId.value = id;
  drawer.value = true;
  const check: number[] = [];
  let responseData = await PermissionListResponse(id);
  if (responseData.code == 200) {
    const list: PermissionNode[] = responseData.data.map((value) => {
      if (value.select) {
        check.push(value.id);
      }
      return Object.assign(value, { label: value.name });
    });
    if (data.length != 0) data = [];
    data.push(...list);
    // ElMessage.success("成功");
  } else {
    // ElMessage.error("失败");
  }
  //直接赋值不行
  await nextTick(() => {
    checkedKey.value = [];
    checkedKey.value.push(...check);
  });
};
const editTable = (row) => {
  dialogVisibility.value = true;
  Object.assign(role, row);
};

const deleteRow = async ($index) => {
  records.value.splice($index, 1);
  let response = await DeleteRoleRoleResponseData($index);
  if (response.code == 200) {
    ElMessage.success("成功");
    await hasRole();
  } else {
    ElMessage.error("失败");
  }
};

const currentChange = () => {
  hasRole();
};
const pageSizeChange = () => {
  hasRole();
};
/// ------------------更新和添加表单
const dialogVisibility = ref(false);
const rules: FormRules = {
  roleName: [{ required: true, trigger: "blur", min: 3 }],
};
const formRef = ref<FormInstance>();
const role = reactive<Role>({
  createTime: "",
  id: 0,
  remark: null,
  roleName: "",
  updateTime: "",
});
const UpdateRoleName = async () => {
  await formRef.value?.validate();
  let response = null;
  if (role.id == 0 || role.id == undefined)
    response = await SaveRoleResponseData(role);
  else response = await UpdateRoleResponseData(role);
  if (response.code == 200) {
    ElMessage.success("成功");
    await hasRole();
  } else {
    ElMessage.error("失败");
  }
  dialogVisibility.value = false;
};

//  ----------------------分配权限drawer
const drawer = ref(false);
let data = reactive<PermissionNode[]>([]);
const defaultProp = {
  children: "children",
  label: "name",
};
const curId = ref<number>(0);
const checkedKey = ref<number[]>([]);
// tree 实例
const treeRef = ref();
const save = async () => {
  let nodes = treeRef.value.getCheckedKeys();
  let nodes1 = treeRef.value.getHalfCheckedKeys();
  const list = nodes.concat(nodes1);
  console.log(list, "list");
  let defaultResponse = await RoleAssignResponse(curId.value, list);
  if (defaultResponse.code == 200) {
    ElMessage.success("成功");
    await hasRole();
  } else {
    ElMessage.error("失败");
  }
  drawer.value = false;
};
// document.addEventListener("click", () => {
//   // console.log(drawerData, "drawerData");
// });
onMounted(() => {
  hasRole();
});
</script>

<template>
  <div>
    <!--  角色搜索卡片-->
    <el-card>
      <el-form class="form">
        <el-form-item label="角色名称">
          <el-input placeholder="角色名称" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHandler">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--  角色展示表格卡片-->
    <el-card style="margin: 10px 0">
      <el-button
        style="margin: 0 0 20px 0"
        icon="Plus"
        type="primary"
        @click="addRole"
      >
        添加角色
      </el-button>
      <el-table border :data="records">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button icon="User" type="primary" @click="RoleCommit(row.id)">
              分配权限
            </el-button>
            <el-button icon="Edit" type="primary" @click="editTable(row)">
              编辑
            </el-button>
            <el-button icon="Delete" type="primary" @click="deleteRow(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:total="total"
        v-model:current-page="pageNo"
        :page-size="pageSize"
        layout="prev,pager,next,jumper,->,sizes,total"
        @current-change="currentChange"
        @size-change="pageSizeChange"
      ></el-pagination>
    </el-card>

    <!--  更新和添加按钮回调-->
    <el-dialog v-model="dialogVisibility">
      <template #header>
        <h2>{{ role.id ? "更新" : "添加" }}</h2>
      </template>
      <template #default>
        <el-form :rules="rules" :model="role" ref="formRef">
          <el-form-item label="角色名称" prop="roleName">
            <el-input placeholder="请输入" v-model="role.roleName" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="dialogVisibility = false">取消</el-button>
        <el-button type="primary" @click="UpdateRoleName">确定</el-button>
      </template>
    </el-dialog>
    <!--    分配权限drawer -->
    <el-drawer v-model="drawer">
      <template #header>
        <h2>分配权限</h2>
      </template>
      <template #default>
        <el-tree
          ref="treeRef"
          :data="data"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[2, 3]"
          :default-checked-keys="checkedKey"
          :props="defaultProp"
        />
      </template>
      <template #footer>
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
}
</style>
