<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { hasUser } from "@/api/user";
import { UserType } from "@/api/user/type.ts";
import { ElMessage, FormInstance, TableInstance } from "element-plus";

const total = ref(1);
const pageNo = ref(1);
const pageSize = ref(3);
const records = ref<UserType[]>([]);
const getUser = async () => {
  let responseData = await hasUser(pageNo.value, pageSize.value);
  if (responseData.code == 200) {
    records.value = responseData.data.records;
    total.value = responseData.data.total;
  } else {
    ElMessage.error("error");
  }
};
// 添加user回调

const addUser = () => {
  drawer.value = true;
};
const drawer = ref(true);
onMounted(() => {
  getUser();
});
const pageChange = () => {
  getUser();
};
const pageSizeChange = () => {
  pageNo.value = 1;
  getUser();
};
const tableRef = ref<TableInstance>();
const formParam = reactive({
  username: "",
  name: "",
  passwd: "",
});
//添加user 的 rule
const formRule = {
  username: [{ trigger: "change", required: true, message: "必填字段" }],
  name: [{ trigger: "change", required: true, message: "必填字段" }],
  passwd: [{ trigger: "change", required: true, message: "必填字段" }],
};
const formRef = ref<FormInstance>();
// form 表单提交 要先校验
const save = async () => {
  console.log("111");
  await formRef.value?.validate();
};
</script>

<template>
  <div>
    <el-card style="margin: 10px 0">
      <el-form :inline="true" class="user-form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger">批量删除</el-button>
      <el-table ref="tableRef" border :data="records">
        <el-table-column type="selection" />
        <el-table-column label="#" type="index" />
        <el-table-column label="id" prop="id"></el-table-column>
        <el-table-column label="用户名字" prop="username" />
        <el-table-column label="用户称呼" prop="name" />
        <el-table-column label="用户角色" prop="roleName" />
        <el-table-column label="创建时间" prop="createTime" />
        <el-table-column label="更新时间" prop="updateTime" />
        <el-table-column label="操作">
          <el-button size="small" type="primary" icon="User">
            分配角色
          </el-button>
          <el-button size="small" type="primary" icon="Edit">编辑</el-button>
          <el-button size="small" type="primary" icon="Delete">删除</el-button>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        v-model:page-size="pageSize"
        v-model:current-page="pageNo"
        @current-change="pageChange"
        @size-change="pageSizeChange"
        layout="prev,pager,next,jumper,->,page-size,total"
      />
      <el-drawer v-model="drawer">
        <template #header>
          <h1>添加用户</h1>
        </template>
        <template #default>
          <el-form :rules="formRule" ref="formRef" :model="formParam">
            <el-form-item label="用户姓名" prop="name">
              <el-input placeholder="请填写用户名字" v-model="formParam.name" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input
                placeholder="请填写用户昵称"
                v-model="formParam.username"
              />
            </el-form-item>
            <el-form-item label="用户密码" prop="passwd">
              <el-input
                placeholder="请填写用户密码"
                v-model="formParam.passwd"
              />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button>取消</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.user-form {
  display: flex;
  justify-content: space-between;
}
</style>
