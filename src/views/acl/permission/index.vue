<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  AddPermissionResponseData,
  DeletePermissionResponseData,
  hasPermissionResponseData,
} from "@/api/acl/permission";
import { PermissionNode } from "@/api/user/type.ts";
import { ElMessage } from "element-plus";

//  table 组件实例
const data = ref<PermissionNode[]>();
const hasPermission = async () => {
  let response = await hasPermissionResponseData();
  if (response.code == 200) {
    // ElMessage.success("成功");
    data.value = response.data;
  } else {
    // ElMessage.error("失败");
    console.log(response.message);
  }
};
const add = () => {
  //清空上次数据
  Object.assign(formParam, {
    children: [],
    code: "",
    createTime: "",
    id: 0,
    level: 0,
    name: "",
    pid: 0,
    status: null,
    toCode: null,
    type: 0,
    updateTime: "",
    select: true,
  });
  dialogVisibility.value = true;
  // Object.assign(formParam, row);
  formParam.name = "";
  formParam.code = "";
};
const updatePermission = (row) => {
  dialogVisibility.value = true;
  Object.assign(formParam, row);
};
onMounted(() => {
  hasPermission();
});

//dialog 组件实例
const formParam = reactive<PermissionNode>({
  children: [],
  code: "",
  createTime: "",
  id: 0,
  level: 0,
  name: "",
  pid: 0,
  status: null,
  toCode: null,
  type: 0,
  updateTime: "",
  select: true,
});
const dialogVisibility = ref(false);
// dialog确定提交

const confirmCommit = async () => {
  let defaultResponse = await AddPermissionResponseData(formParam);
  if (defaultResponse.code == 200) {
    ElMessage.success("成功");
    await hasPermission();
  } else {
    ElMessage.error("失败");
  }
  dialogVisibility.value = false;
};

const deletePermission = async (id: number) => {
  let response = await DeletePermissionResponseData(id);
  if (response.code == 200) {
    ElMessage.success("成功");
    await hasPermission();
  } else {
    ElMessage.error("失败");
  }
};
</script>

<template>
  <div>
    <el-table :data="data" border row-key="id">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="primary" :disabled="row.leave == 4" @click="add">
            {{ row.level == 3 ? "添加功能" : "添加菜单" }}
          </el-button>
          <el-button
            type="primary"
            :disabled="row.level == 1"
            @click="updatePermission(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            @confirm="deletePermission(row.id)"
            :title="`确定删除${row.name}`"
          >
            <template #reference>
              <el-button type="primary" :disabled="row.level == 1">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisibility">
      <template #header>
        <h2>Tips</h2>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="名称">
            <el-input v-model="formParam.name" placeholder="请填写名称" />
          </el-form-item>
          <el-form-item label="权限值">
            <el-input placeholder="请填写权限值" v-model="formParam.code" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="dialogVisibility = false">cancel</el-button>
        <el-button @click="confirmCommit">confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>