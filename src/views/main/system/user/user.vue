<script setup lang="ts">
import { computed } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import usePageSearch from "@/hooks/use-page-search";
import { modelConfig } from "./config/model.config";
import { usePageModel } from "@/hooks/use-page-model";
import {useMainStore} from "@/stores/index";
import PageModel from '@/components/page-model'

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();
// hook
const newCallback = () => {
  const passwordItem = modelConfig.formItems.find(
    (item) => item.field === "password"
  );
  passwordItem!.isHidden = false;
};
const editCallback = () => {
  const passwordItem = modelConfig.formItems.find(
    (item) => item.field === "password"
  );
  passwordItem!.isHidden = true;
};

// 2.动态添加部门和角色列表
const store = useMainStore();
const modelConfigRef = computed(() => {
  const departmentItem = modelConfig.formItems.find(
    (item) => item.field === "departmentId"
  );
  departmentItem!.options = store.entireDeparment.map((item: any) => {
    return { title: item.name, value: item.id };
  });
  const roleItem = modelConfig.formItems.find(
    (item) => item.field === "roleId"
  );
  roleItem!.options = store.entireRole.map((item: any) => {
    return { title: item.name, value: item.id };
  });
  return modelConfig;
});
// 3.调用hook获取公共变量和函数
const [pageModelRef, defaultInfo, handleNewData, handleEditData] = usePageModel(
  newCallback,
  editCallback
);
</script>

<template>
  <div class="user">
    <!-- 高级检索 -->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <!-- 内容 -->
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>

    <!-- 新建 -->
    <page-model
      :defaultInfo="defaultInfo"
      ref="pageModelRef"
      pageName="users"
      :modelConfig="modelConfigRef"
    ></page-model>
  </div>
</template>

<style scoped></style>
