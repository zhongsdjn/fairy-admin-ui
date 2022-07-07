export default UserInfo
<script setup lang="ts">
import { computed } from "vue";
import { LoginModule } from "../../../stores/login/login";
import localCache from "@/utils/cache";
import { useRouter } from "vue-router";

const useStore = LoginModule();
const name = computed(() => useStore.userInfo?.name);

const router = useRouter();
const handleExitClick = () => {
  localCache.deleteCache("token");
  router.push("/main");
};
</script>

<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          class="avatar"
          :size="30"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleClose" @click="handleExitClick"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item divided>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="less">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  .avatar {
    margin-right: 5px;
  }
}
</style>
