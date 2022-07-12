<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { systemModule } from "@/stores/main/system/system";
import ZhTable from "@/base-ui/table";
import { usePermission } from "@/hooks/use-permission";

const props = defineProps({
  contentTableConfig: {
    // type: Array,
    type: Object,
    require: true,
  },
  pageName: {
    type: String,
    required: true,
  },
});

const useSystemStore = systemModule();

// 0.获取操作的权限
const isCreate = usePermission(props.pageName, "create");
const isUpdate = usePermission(props.pageName, "update");
const isDelete = usePermission(props.pageName, "delete");
const isQuery = usePermission(props.pageName, "query");

// 1.双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
watch(pageInfo, () => getPageData());

// 2.发送网络请求
const getPageData = (queryInfo: any = {}) => {
  // console.log("page-content:", queryInfo);
  if (!isQuery) return;
  useSystemStore.getPageListAction({
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo,
    },
  });
};
getPageData();

// 3.从vuex中获取数据
const dataList = computed(() => useSystemStore.pageListData(props.pageName));

const dataCount = computed(() => useSystemStore.pageListCount(props.pageName));

// 4.获取其他的动态插槽名称
const otherPropSlots = props.contentTableConfig?.propList.filter(
  (item: any) => {
    if (item.slotName === "status") return false;
    if (item.slotName === "createAt") return false;
    if (item.slotName === "updateAt") return false;
    if (item.slotName === "handler") return false;
    return true;
  }
);

const emit = defineEmits(["newBtnClick", "editBtnClick"]);

// 删除一行数据
const handleDeleteClick = (item: any) => {
  useSystemStore.deletePageDataAction({
    pageName: props.pageName,
    id: item.id,
  });
};

// 编辑
const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};

// 新建
const handleNewClick = () => {
  emit("newBtnClick");
  console.log(props.contentTableConfig?.propList)
};

// 隐藏
// const handleColHiddenClick = () => {
//   // emit("colHiddenBtnClick");
//   for (const item of props.contentTableConfig?.propList) {
//     if ( item.isColShow === false) {
//       console.log(item)
//       item.isColShow = true
//     }
//   }
// };

// 必须定义defineExpose 在usePageSearch中pageContentRef.value?.getPageData(queryInfo)才能识别到
defineExpose({
  getPageData,
});
</script>

<template>
  <div class="page-content">
    <zh-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- 1.header中的插槽 TODO 新建用户应由用户传递  or  直接写新建-->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="default"
          @click="handleNewClick"
          >新建</el-button
        >
      </template>
      <!-- 隐藏列 -->
      <!-- <template #colHidden>
        <el-button
          type="primary"
          size="default"
          @click="handleColHiddenClick"
          >隐藏列</el-button
        >
      </template> -->

      <!-- 2.列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-tooltip content="编辑" placement="top">
            <el-button
              v-if="isUpdate"
              icon="edit"
              size="small"
              plain
              type="primary"
              circle
              @click="handleEditClick(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button
              v-if="isDelete"
              icon="delete"
              size="small"
              plain
              type="danger"
              circle
              @click="handleDeleteClick(scope.row)"
            ></el-button>
          </el-tooltip>
        </div>
      </template>

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </zh-table>
  </div>
</template>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
