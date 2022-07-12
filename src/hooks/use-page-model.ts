import { ref } from "vue";
import PageModel from "@/components/page-model";

type CallBackFn = (item?: any) => void;
export function usePageModel(
  newCallback?: CallBackFn,
  editCallback?: CallBackFn,
): any {
  const pageModelRef = ref<InstanceType<typeof PageModel>>();
  const defaultInfo = ref({});
  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true;
    }

    newCallback && newCallback();
  };
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModelRef.value) {
      pageModelRef.value.centerDialogVisible = true;
    }

    editCallback && editCallback(item);
  };

  return [pageModelRef, defaultInfo, handleNewData, handleEditData];
}
