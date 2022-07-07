import { defineStore } from "pinia";

import { ISystemState } from "./types";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "../../../service/main/system/system";
// import { id } from "element-plus/es/locale";
import {} from "../../../service/main/system/system";

export const systemModule = defineStore("system", {
  state: (): ISystemState => ({
    usersList: [],
    usersCount: 0,
    roleList: [],
    roleCount: 0,
    goodsList: [],
    goodsCount: 0,
    menuList: [],
    menuCount: 0,
  }),
  getters: {
    // e.g.: state[usersList]
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },

    // e.g.: state[usersCount]
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    async getPageListAction(payload: any) {
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      const { list, totalCount } = pageResult.data;

      // const changePageName = pageName.slice(0,1).toUpperCase() + pageName.slice(1)

      switch (pageName) {
        case "users":
          this.changeUsersList(list);
          this.changeUsersCount(totalCount);
          break;
        case "role":
          this.changeRoleList(list);
          this.changeRoleCount(totalCount);
          break;
        case "menu":
          this.changeMenuList(list);
          this.changeMenuCount(totalCount);
          break;
        case "goods":
          this.changeGoodsList(list);
          this.changeGoodsCount(totalCount);
          break;
      }
    },

    async deletePageDataAction(payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据
      // TODO 优好的方案是拿到查询条件一起请求最新的数据
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async createPageDataAction(payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);

      // 2.请求最新的数据
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    async editPageDataAction(payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload;
      console.log(editData);
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);

      // 2.请求最新的数据
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },

    changeUsersList(usersList: any[]) {
      this.usersList = usersList;
    },
    changeUsersCount(usersCount: number) {
      this.usersCount = usersCount;
    },

    changeRoleList(roleList: any[]) {
      this.roleList = roleList;
    },
    changeRoleCount(roleCount: number) {
      this.roleCount = roleCount;
    },

    changeGoodsList(goodsList: any[]) {
      this.goodsList = goodsList;
    },
    changeGoodsCount(goodsCount: number) {
      this.goodsCount = goodsCount;
    },

    changeMenuList(list: any[]) {
      this.menuList = list;
    },
    changeMenuCount(count: number) {
      this.menuCount = count;
    },
  },
});
