import { defineStore } from "pinia";
import type { IAccount } from "../../service/login/types";
import type { ILoginState } from "./types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "../../service/login/login";
import localCache from "../../utils/cache";
import router from "../../router";
import { mapMenusToPermissions, mapMenusToRoutes } from "../../utils/map-menus";
import { useMainStore } from "../index";

export const LoginModule = defineStore("login", {
  state: (): ILoginState => ({
    token: "",
    userInfo: {},
    userMenus: [],
    permissions: [],
  }),

  getters: {},

  actions: {
    // 执行登录的操作
    async accountLoginAction(accout: IAccount) {
      // 1、实现登录的逻辑
      const loginResult = await accountLoginRequest(accout);
      const { id, token } = loginResult.data;
      // 得到返回的结果后将token写入pinia
      this.changeToken(token);
      // 本地缓存token
      localCache.setCache("token", token);

      // 发送初始化请求(完整的role/department)
      useMainStore().getInitialDataAction();

      ///2、请求用户的信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      this.changeUserInfo(userInfo);

      // 缓存用户信息
      localCache.setCache("userInfo", userInfo);

      // 3、请求用户菜单
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenuResult.data;
      console.log(userMenus);
      this.changeUserMenus(userMenus);
      // 缓存用户菜单
      localCache.setCache("userMenus", userMenus);

      // 4、跳转到首页
      router.push("/main");
    },

    // 从缓存读取数据 页面刷新时重写入到pinia里面去
    loadLocalLogin() {
      const token = localCache.getCache("token");
      if (token) {
        this.changeToken(token);

        useMainStore().getInitialDataAction();
      }

      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        this.changeUserInfo(userInfo);
      }

      const userMenus = localCache.getCache("userMenus");
      if (userMenus) {
        this.changeUserMenus(userMenus);
      }
    },

    // phoneLoginAction(phone: { number: string; code: string }) {
    //   console.log(phone, "手机号登录");
    // },

    // 将token写入pinia
    changeToken(token: string) {
      this.token = token;
    },

    // 用户信息写入pinia
    changeUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },

    // 用户菜单信息写入pinia
    changeUserMenus(userMenus: any) {
      this.userMenus = userMenus;

      // userMenus => routes 将菜单映射到routes
      // 将routes => router.main.children
      const routes = mapMenusToRoutes(userMenus);
      // 将routes添加到router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route);
      });

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      this.permissions = permissions;
    },
  },
});
