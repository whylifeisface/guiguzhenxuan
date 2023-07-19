<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  DeleteMultipleUserResponseData,
  DeleteUser,
  hasUser,
  hasUserAssign,
  SaveUserRole,
  SearchUser,
  UpdateOrAddUser,
} from "@/api/user";
import { Role, UserAssignSaveData, UserType } from "@/api/user/type.ts";
import { ElMessage, FormInstance, TableInstance } from "element-plus";
import { useLayoutSettingStore } from "@/store/module/setting.ts";

const total = ref(1);
const pageNo = ref(1);
const pageSize = ref(3);
const records = ref<UserType[]>([]);

//搜索关键字
const keyword = ref("");
//搜索按钮回调
const search = async () => {
  pageNo.value = 1;
  let responseData = await SearchUser(
    pageNo.value,
    pageSize.value,
    keyword.value,
  );
  if (responseData.code == 200) {
    ElMessage.success("成功");
    records.value = [];
    records.value.push(...responseData.data.records);
  } else {
    ElMessage.error("失败");
  }
  keyword.value = "";
};
//重置按钮回调
let store = useLayoutSettingStore();
const reset = () => {
  store.$state.refresh = !store.$state.refresh;
};
//删除多个用户的id list集合
const deleteUserIdList = ref<number[]>([]);
//确定删除列表行的回调
const conFirmDeleteUser = async (row: any) => {
  // console.log(row, "row");
  let response = await DeleteUser(row.id);
  if (response.code == 200) {
    ElMessage.success("删除成功");
    await getUser();
  } else {
    ElMessage.error("删除失败");
  }
  roleDrawer.value = false;
};

// 批量删除按钮回调
const DeleteMultipleUser = async () => {
  // deleteUserIdList.value =
  const idList = deleteUserIdList.value.map((value) => {
    if ("id" in value) return value.id;
    else return value;
  });
  //TODO delete请求如何携带payload
  let defaultResponse = await DeleteMultipleUserResponseData(idList);
  if (defaultResponse.code == 200) {
    ElMessage.success("删除成功");
  } else {
    ElMessage.error("删除失败");
  }
};
const tableSelectionChange = (selection) => {
  // console.log(selection, "selection");
  //先清空数组
  deleteUserIdList.value = [];
  //解构数组 不解构对象
  if (selection.length && selection.length > 1)
    deleteUserIdList.value.push(...selection);
  else deleteUserIdList.value.push(selection);
};
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
const updateRole = async (row: any) => {
  const empty = {
    createTime: "",
    name: "",
    password: "",
    phone: null,
    roleName: "",
    updateTime: "",
    username: "",
  };
  //清空上次的数据
  Object.assign(roleData, empty);
  positionList.value = [];
  checkList.value = [];

  // console.log(row, "row");
  Object.assign(roleData, row);
  let response = await hasUserAssign(row.id);
  if (response.code == 200) {
    positionList.value.push(...response.data.allRolesList);
    checkList.value.push(...response.data.assignRoles);
  }
  // console.log(checkList, " checkList");
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
    //如果修改的是自己的密码 通过重新刷新 请用户去重新登录
    window.location.reload();
    await getUser();
  } else ElMessage.error(formParam.id ? "修改 " : "添加" + `失败`);
  drawer.value = false;
};
const UpdateUser = (row: unknown) => {
  drawer.value = true;
  Object.assign(formParam, row);
  // console.log(formParam, "formParam");
};

//  管理分配角色的drawer
//控制 role 有关的 drawer是否显示
const roleDrawer = ref<boolean>(false);
const roleData = reactive<UserType>({
  createTime: "",
  name: "",
  password: "",
  phone: null,
  roleName: "",
  updateTime: "",
  username: "",
});

//对应的职位列表 check group
const positionList = ref<Role[]>([]);

//checkbox 是否全部选中
const checkAll = ref<boolean>(true);
//全选checkbox是否处于中间状态
const indeterminate = ref<boolean>(false);
//当是否全选改变时的回调
const checkAllChange = () => {
  indeterminate.value = false;
  checkAll.value = !checkAll.value;
};
// 对于选中哪几个职位(checkbox)
const checkList = ref<Role[]>([]);
const checkListChange = (value: string[]) => {
  console.log("111");
  const length = value.length;
  checkAll.value = length === positionList.value.length;
  indeterminate.value = length > 0 && length < positionList.value.length;
};
//roleDrawer 确定按钮回调
const confirmRole = async () => {
  roleDrawer.value = false;
  const roleIdList = checkList.value.map((value) => {
    return value.id;
  });
  // console.log(roleIdList, "roleIdList");
  const data: UserAssignSaveData = {
    roleIdList: roleIdList,
    userId: roleData.id as number,
  };
  // console.log("data ", data);
  let response = await SaveUserRole(data);
  if (response.code == 200) {
    ElMessage.success("成功");
    await getUser();
  } else {
    ElMessage.error("失败");
  }
};
</script>

<template>
  <div>
    <el-card style="margin: 10px 0">
      <el-form :inline="true" class="user-form">
        <el-form-item label="用户名:">
          <el-input placeholder="请输入用户名" v-model="keyword" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button
        @click="DeleteMultipleUser"
        type="danger"
        :disabled="deleteUserIdList.length == 0"
      >
        批量删除
      </el-button>
      <el-table
        ref="tableRef"
        border
        :data="records"
        @selection-change="tableSelectionChange"
      >
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
              @click="updateRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              size="small"
              type="info"
              icon="Edit"
              @click="UpdateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              @confirm="conFirmDeleteUser(row)"
              :title="`您确定要删除${row.name}吗?`"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="Delete">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
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
              <el-input :disabled="true" v-model="roleData.name" />
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
                  :key="item.id"
                  :label="item"
                >
                  {{ item.roleName }}
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
