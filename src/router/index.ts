import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import localCache from "../utils/cache";
import { firstMenu } from "../utils/map-menus";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },

  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    // children: []  从userMenus动态写入
  },

  {
    // 404页面
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/notfound/notfound.vue"),
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

// 导航守卫
router.beforeEach((to) => {
  if (to.path !== "/login") {
    // 获取缓存中的token
    const token = localCache.getCache("token");
    // 如果没有token 未登录跳转到登录页面
    if (!token) {
      return "/login";
    }
  }
  // 当访问首页url时跳转到第一个get的菜单选项  置为活跃项(选中)
  if (to.path === "/main") {
    return firstMenu.url;
  }
});
export default router;
