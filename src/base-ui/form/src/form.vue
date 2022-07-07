export default ZhForm

<script setup lang="ts">
import { computed, PropType, ref, watch } from "vue";
import { IFormItem } from "../types";

const props = defineProps({
  // 使用v-model传值时 接收值默认为modelValue
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    // 对象或数组的默认值定义要为函数
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  itemStyle: {
    type: Object,
    default: () => ({
      padding: "10px 40px",
    }),
  },
  colLayout: {
    type: Object,
    default: () => ({
      // 栅格共24份
      xl: 6, // >1920px 4个
      lg: 8, // 3个
      md: 12, // 2个
      sm: 24, // 1个
      xs: 24, // 1个
    }),
  },
});

// 结构对象赋予新的变量
const emits = defineEmits(["update:modelValue"]);
const handleValueChange = (value: any, field: string) => {
  emits("update:modelValue", { ...props.modelValue, [field]: value });
};
</script>

<template>
  <div class="zh-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOption"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOption"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOption"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.zh-form {
  padding-top: 22px;
}
</style>
