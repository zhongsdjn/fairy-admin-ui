import menu from "@/router/main/system/menu/menu";
import { RouteRecordRaw } from "vue-router";
import { IBreadcrumb } from "../base-ui/breadcrumb";

let firstMenu: any = null;
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  //  vite import.meta.globEager 替代webpack的 require.context()
  const routeFiles = import.meta.globEager("../router/main/**/*.ts");

  for (const path in routeFiles) {
    allRoutes.push(routeFiles[path].default);
  }

  // console.log(allRoutes);  如下
  // 0: {path: '/main/analysis/dashboard', name: 'dashboard', children: Array(0), component: ƒ}
  // 1: {path: '/main/analysis/overview', name: 'overview', children: Array(0), component: ƒ}

  // 根据菜单获取需要添加的routes

  //   递归遍历userMenus
  const _recurseGetRoute = (meuns: any[]) => {
    for (const menu of meuns) {
      // type为2的route是可以跳转的有对应组件的url
      if (menu.type === 2) {
        // type为2并且在allRoutes中可以匹配的url是要动态加载的路由
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);

  return routes;
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

// 刷新时根据当前路径匹配userMenus得到menu.id 即为当前活跃项
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath);
      // 面包屑相关
      if (findMenu) {
        // 只需要名字即可
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);

  return permissions;
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = [];
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);
  return leftKeys;
}

export { firstMenu };
