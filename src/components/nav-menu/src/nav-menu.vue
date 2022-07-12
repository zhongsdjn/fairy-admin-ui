export default NavMenu
<script setup lang="ts">
import { ref } from "vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { LoginModule } from "../../../stores/login/login";
import { pathMapToMenu } from "../../../utils/map-menus";

const props = defineProps<{
  collapse: boolean;
}>();
const userStore = LoginModule();
const userMenus = computed((): any[] => userStore.userMenus);

// 处理点击菜单时对应的路由跳转(type为2的对象)
const router = useRouter();

// 菜单选中项
// get当前路径
const route = useRoute();
const currentPath = route.path;
// 根据当前路径匹配userMenus得到menu
const menu = pathMapToMenu(userMenus.value, currentPath);
// menu.id即为当前选中项
const defaultValue = ref(menu.id + "");

const handleMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? "/not-found",
  });
};
</script>

<template>
  <div class="nav-menu">
    <!-- logo -->
    <div class="logo">
      <!-- 模板中使用别名: ~@/ -->
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <!-- 当不折叠的时候显示文字  折叠的时候不显示文字 -->
      <span class="title" v-if="!collapse">FairyAdmin</span>
    </div>

    <!-- 菜单 -->
    <!-- el-menu为菜单整体  -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      :unique-opened="false"
      active-text-color="#0a60bd"
    >
      <!-- 遍历菜单数组来展示详情 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 判断item类型 二级菜单-->
        <template v-if="item.type === 1">
          <!-- index作为(选中)标识 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- 如果icon有值时显示  无值不显示 -->
              <!-- <i v-if="item.icon" :class="item.icon"></i> -->
              <template v-if="item.icon">
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
              </template>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenuItemClick(subitem)"
              >
                <!-- 如果icon有值时显示  无值不显示 -->
                <template v-if="subitem.icon">
                  <el-icon>
                    <component :is="subitem.icon" />
                  </el-icon>
                </template>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <!-- el-meun-item表示末端节点 -->
          <el-menu-item :index="item.id + ''">
            <!-- 如果icon有值时显示  无值不显示 -->
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    // 去除el-menu自带的右侧线条
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;

    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
