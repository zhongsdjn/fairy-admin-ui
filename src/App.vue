<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <div class="app">
    <ElConfigProvider :locale="zhCn">
      <router-view></router-view>
    </ElConfigProvider>
  </div>
</template>

<style>
.app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */

  height: 100%;
}
</style>
