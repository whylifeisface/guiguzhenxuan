<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { hasUser, UpdateOrAddUser } from "@/api/user";
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
  const copy = {
    id: 0,
    username: "",
    password: "",
    name: "",
  };
  Object.assign(formParam, copy);
  formRef.value?.resetFields();
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
const formParam = reactive<UserType>({
  createTime: "",
  name: "",
  password: "",
  phone: null,
  roleName: "",
  updateTime: "",
  username: "",
});

//分配角色按钮回调
const updateRole = () => {
  roleDrawer.value = true;
};

//添加user 的 rule
const formRule = {
  username: [{ trigger: "change", required: true, message: "必填字段" }],
  name: [{ trigger: "change", required: true, message: "必填字段" }],
  password: [{ trigger: "change", required: true, message: "必填字段" }],
};
const formRef = ref<FormInstance>();
// form 表单提交 要先校验
const save = async () => {
  console.log("111");
  await formRef.value?.validate();
  let response = await UpdateOrAddUser(formParam);
  if (response.code == 200) {
    ElMessage.success(formParam.id ? "修改 " : "添加" + `成功`);
    await getUser();
  } else ElMessage.error(formParam.id ? "修改 " : "添加" + `失败`);
};
const UpdateUser = (row) => {
  drawer.value = true;
  Object.assign(formParam, row);
  console.log(formParam, "formParam");
};

//  管理分配角色的drawer
//控制 role 有关的 drawer是否显示
const roleDrawer = ref<boolean>(false);
//对应的职位列表 check group
const positionList = ["销售", "前台", "财务", "boos"];

//checkbox 是否全部选中
const checkAll = ref<boolean>(true);
//全选checkbox是否处于中间状态
const indeterminate = ref<boolean>(false);
//当是否全选改变时的回调
const checkAllChange = () => {};
// 对于选中哪几个职位(checkbox)
const checkList = ref([]);
const checkListChange = (value: string[]) => {
  const length = value.length;
  checkAll.value = length === positionList.length;
  indeterminate.value = length > 0 && length < positionList.length;
};
//roleDrawer 确定按钮回调
const confirmRole = () => {
  roleDrawer.value = false;
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
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              icon="User"
              @click="updateRole"
            >
              分配角色
            </el-button>
            <el-button
              size="small"
              type="primary"
              icon="Edit"
              @click="UpdateUser(row)"
            >
              编辑
            </el-button>
            <el-button size="small" type="primary" icon="Delete">
              删除
            </el-button>
          </template>
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
                v-model="formParam.password"
              />
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </template>
      </el-drawer>
      <!--      分配角色静态-->
      <el-drawer v-model="roleDrawer">
        <template #header>
          <h2>分配角色(职位)</h2>
        </template>
        <template #default>
          <el-form>
            <el-form-item>
              <el-input :disabled="true" />
            </el-form-item>
            <el-form-item>
              <el-checkbox
                v-model="checkAll"
                @change="checkAllChange"
                :indeterminate="indeterminate"
              >
                全选
              </el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-checkbox-group v-model="checkList" @change="checkListChange">
                <el-checkbox
                  v-for="item in positionList"
                  :key="item"
                  :label="item"
                >
                  {{ item }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button @click="roleDrawer = false">cancel</el-button>
          <el-button @click="confirmRole" type="primary">confirm</el-button>
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
