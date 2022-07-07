<script setup lang="ts">
import PageContent from "../../../../components/page-content";
import { contentTableConfig } from "./config/content.config";
</script>

<template>
  <div class="menu">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<style scoped></style>
