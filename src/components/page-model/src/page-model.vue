<script setup lang="ts">
import { ref, watch } from "vue";
import ZhForm from "@/base-ui/form";
import { systemModule } from "@/stores/main/system/system";

const props = defineProps({
  modelConfig: {
    type: Object,
    require: true,
  },
  defaultInfo: {
    type: Object,
    default: () => ({}),
  },
  pageName: {
    type: String,
    require: true,
  },
});

const centerDialogVisible = ref(false);
const formData = ref<any>({});

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modelConfig?.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`];
    }
  }
);

const store = systemModule();
const handleConfirmClick = () => {
  centerDialogVisible.value = false;
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    store.editPageDataAction({
      pageName: props.pageName,
      editData: { ...formData.value },
      id: props.defaultInfo.id,
    });
  } else {
    // 新建
    store.createPageDataAction({
      pageName: props.pageName,
      newData: { ...formData.value },
    });
  }
};

defineExpose({
  centerDialogVisible,
});
</script>

<template>
  <div class="page-model">
    <el-dialog
      v-model="centerDialogVisible"
      title="新建"
      width="30%"
      center
      destroy-on-close
    >
      <ZhForm v-bind="modelConfig" v-model="formData"></ZhForm>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
