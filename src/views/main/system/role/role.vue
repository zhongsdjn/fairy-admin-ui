<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { usePageModel } from "@/hooks/use-page-model";
import PageModel from "@/components/page-model";
import { modelConfig } from "./config/model.config";
import usePageSearch from "@/hooks/use-page-search";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { computed, nextTick, ref } from "vue";
import { useMainStore } from "@/stores";
import { menuMapLeafKeys } from "@/utils/map-menus";
import { ElTree } from "element-plus";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();

// 1.处理pageModal的hook
const elTreeRef = ref<InstanceType<typeof ElTree>>();
const editCallback = (item: any) => {
  const leafKeys = menuMapLeafKeys(item?.menuList);
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafKeys, false);
  });
};
// 3.调用hook获取公共变量和函数
const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  undefined,
  editCallback
);

const store = useMainStore();
const menus = computed(() => store.entireMenu);
const otherInfo = ref({});
const handleCheckChange = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys;
  const halfCheckedKeys = data2.halfCheckedKeys;
  const menuList = [...checkedKeys, ...halfCheckedKeys];
  // menuList: menuList对象语法糖
  otherInfo.value = { menuList };
};
</script>
<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>

    <!-- 新建 -->
    <page-model
      :defaultInfo="defaultInfo"
      ref="pageModelRef"
      pageName="role"
      :modelConfig="modelConfig"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-model>
  </div>
</template>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>