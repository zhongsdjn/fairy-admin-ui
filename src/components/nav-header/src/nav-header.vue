export default NavHeader
<script setup lang="ts">
import { ref } from 'vue';
import UserInfo from './user-info.vue'
import ZhBreadcrumb, { IBreadcrumb } from "../../../base-ui/breadcrumb"
import { pathMapBreadcrumbs } from '../../../utils/map-menus'
import { LoginModule } from "../../../stores/login/login";
import { useRoute } from 'vue-router';
import { computed } from 'vue';


const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleFoldClick = () => {
    isFold.value = !isFold.value
    emit('foldChange', isFold.value)
}

// 面包屑数据
const useStore = LoginModule();
// 路径改变时数据也要动态的改变
const breadcrumbs = computed(() => {
    const userMenus = useStore.userMenus
    const route = useRoute()
    const currentPath = route.path

    return pathMapBreadcrumbs(userMenus, currentPath)
})
</script>

<template>
    <div class="nav-header">
        <el-icon class="fold-menu s-fold">
            <component @click=handleFoldClick :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>

        <div class="content">
            <ZhBreadcrumb :breadcrumbs="breadcrumbs"></ZhBreadcrumb>
            <UserInfo></UserInfo>
        </div>
    </div>
</template>

<style scoped lang="less">
.nav-header {
    display: flex;
    width: 100%;

    .fold-menu {
        font-size: 30px;
        cursor: pointer;
    }

    .content {
        display: flex;
        justify-content: space-between;
        flex: 1; // 占据剩余的全部的空间
        padding: 0 20px;
        align-items: center; // 垂直居中 
    }
}
</style>