<script setup lang="ts">
import { ref } from "vue";
import ZhForm from "@/base-ui/form";

const props = defineProps({
  searchFormConfig: {
    type: Object,
    require: true,
  },
});

const emit = defineEmits(["resetBtnClick", "queryBtnClick"]);

// 1.优化一: formData中的属性应该动态来决定  formData中的属性应该动态来决定
const formItems = props.searchFormConfig?.formItems ?? [];
const formOriginData: any = {};
for (const item of formItems) {
  formOriginData[item.field] = "";
}

// 传到form.vue 通过监听实现双向绑定数据
const formData = ref(formOriginData);

// 2.优化二: 当用户点击重置按钮
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value = formOriginData;
    emit("resetBtnClick");
  }
};
// 3.优化三: 当用户点击搜索
const handleQueryClick = () => {
  console.log("page-search: ", { ...formData.value });
  emit("queryBtnClick", formData.value);
};
</script>

<template>
  <div class="page-search">
    <zh-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <span class="header">高级检索</span>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="refresh" @click="handleResetClick">重置</el-button>
          <el-button type="primary" icon="search" @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </zh-form>
  </div>
</template>
<style scoped>
.header {
  color: blue;
  /* text-align: left; */
}
.handle-btns {
  text-align: right;
  padding: 0 30px 10px 0;
}
</style>
