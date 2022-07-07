<script setup lang="ts">
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { usePageModel } from "@/hooks/use-page-model";
import PageModel from "@/components/page-model";
import { modelConfig } from "./config/model.config";
import usePageSearch from "@/hooks/use-page-search";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch();

// 3.调用hook获取公共变量和函数
const [pageModelRef, defaultInfo, handleNewData, handleEditData] =
  usePageModel();
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
    ></page-model>
  </div>
</template>
<style scoped></style>
