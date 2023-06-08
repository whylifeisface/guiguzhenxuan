<script setup lang="ts">
// import { defineProp }
import { useRouter } from "vue-router";
defineProps(["menuList"]);
const $router = useRouter();
const goRoute = async (vs: any) => {
  // console.log(vs);
  await $router.push(vs.index);
};
</script>
<script lang="ts">
export default {
  name: "Menu",
};
</script>
<template>
  <div>
    <!--    <p>{{ menuList }}</p>-->
    <el-menu>
      <template v-for="item in menuList" :key="item.path">
        <!--        没有子路由-->
        <template v-if="!item.children">
          <el-menu-item
            v-if="!item.meta.hidden"
            :index="item.path"
            @click="goRoute"
          >
            <template #title>
              <el-icon>
                <!--                动态组件-->
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
          </el-menu-item>
        </template>
        <!--        有子路由 子路由只有一个-->
        <template v-else-if="item.children && item.children.length == 1">
          <el-menu-item
            v-if="!item.children[0].meta.hidden"
            :index="item.children[0].path"
          >
            <template #title>
              <el-icon>
                <!--                动态组件-->
                <component :is="item.children[0].meta.icon"></component>
              </el-icon>
              <span>{{ item.children[0].meta.title }}</span>
            </template>
          </el-menu-item>
        </template>

        <el-sub-menu :index="item.path" v-else>
          <template #title>
            <el-icon>
              <!--                动态组件-->
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </template>
          <!--            //递归组件-->
          <Menu :menu-list="item.children"></Menu>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss"></style>
