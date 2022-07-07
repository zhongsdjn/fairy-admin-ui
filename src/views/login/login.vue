<script setup lang="ts">
import loginPanel from './cpns/login-panel.vue';

</script>

<template>
    <div class="login">
        <loginPanel />
    </div>
</template>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('../../assets/img/login-bg.svg');
}
</style>
