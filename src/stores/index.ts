import { defineStore } from "pinia";
import { IRootState } from "./types";
import { getPageListData } from "@/service/main/system/system";
import { LoginModule } from "./login/login";

export const useMainStore = defineStore("main", {
  state: (): IRootState => ({
    name: "anye",
    age: 18,
    entireDeparment: [],
    entireRole: [],
  }),

  getters: {},

  actions: {
    async getInitialDataAction() {
      const deparmentListResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000,
      });

      const { list: deparmentList } = deparmentListResult.data;
      const roleListResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleListResult.data;

      this.changeEntireDepartment(deparmentList);
      this.changeEntireRole(roleList);
    },

    changeEntireDepartment(list: any[]) {
      this.entireDeparment = list;
    },
    changeEntireRole(list: any[]) {
      this.entireRole = list;
    },
  },
});

// 刷新页面时 从缓存读取数据写入pinia
// const loginStore = LoginModule();  // 此处全局调用会引起循环引入
export function setupStore() {
  // 在此局部引用 解决getActivePinia was called with no active Pinia. Did you forget to install pinia ... 问题
  const loginStore = LoginModule();
  loginStore.loadLocalLogin();
}
