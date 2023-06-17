<script setup lang="ts">
const $emit = defineEmits(["changeScene"]);
// 点击取消按钮通知父组件切换
const cancel = () => {
  $emit("changeScene", 0);
};
</script>

<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请你输入SPU名称" />
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select>
        <el-option label="华为"></el-option>
        <el-option label="oppo"></el-option>
        <el-option label="vivo"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请你输入SPU描述" />
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload>
      </el-upload>
    </el-form-item>
    <el-form label-width="100px">
      <el-form-item label="SPU销售属性">
        <!--        展示销售属性的下拉菜单-->
        <el-select>
          <el-option label="华为"></el-option>
          <el-option label="oppo"></el-option>
          <el-option label="vivo"></el-option>
        </el-select>
        <el-button style="margin-left: 10px" type="primary" icon="Plus">
          添加属性值
        </el-button>
        <el-table border style="margin: 10px 0">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          />
          <el-table-column
            label="销售属性名称"
            type="index"
            width="100px"
          ></el-table-column>
          <el-table-column
            label="销售属性值"
            type="index"
            width="100px"
          ></el-table-column>
          <el-table-column label="操作" width="120px"></el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary"></el-button>
          <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>
  </el-form>
</template>

<style scoped lang="scss"></style>
