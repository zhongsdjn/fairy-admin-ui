export default ZhBreadcrumb

<script setup lang="ts">
import { PropType } from 'vue';
import { IBreadcrumb } from '../types'

const props = defineProps({
    breadcrumbs: {
        type: Array as PropType<IBreadcrumb[]>,
        default: () => []
    }
})

</script>

<template>
    <div class="nav-breadcrumb">
        <el-breadcrumb separator="/">
            <template v-for="item in breadcrumbs" :key="item.name">
                <el-breadcrumb-item :to="{ path: item.path ?? '' }"> {{ item.name }}
                </el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template>

<style scoped lang="less">
</style>
