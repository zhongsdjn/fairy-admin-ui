import zhRequest from "../index";
import { IAccount, ILoginResult } from "./types";
import { IDataType } from "../types";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/",
}

// 用户登录
export function accountLoginRequest(account: IAccount) {
  return zhRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
  });
}

// 根据用户id获取用户信息
export function requestUserInfoById(id: number) {
  return zhRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false,
  });
}

// 根据角色id获取菜单信息
export function requestUserMenusByRoleId(id: number) {
  return zhRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false,
  });
}
