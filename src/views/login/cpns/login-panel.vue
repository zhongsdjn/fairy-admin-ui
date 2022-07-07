<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';

export default defineComponent({
    components: {
        LoginAccount,
        LoginPhone
    },
    setup() {
        // 记住密码
        const isKeepPassword = ref(true)
        const accountRef = ref<InstanceType<typeof LoginAccount>>()
        const phoneRef = ref<InstanceType<typeof LoginPhone>>()
        const currentTab = ref<string>("account")

        // 登录
        const handleLoginClick = () => {

            if (currentTab.value === "account") {
                // 账号登录
                accountRef.value?.loginAction(isKeepPassword.value)

            } else {
                // 手机登录
                console.log('手机号登录  phoneRef调用loginAction')
                phoneRef.value?.loginAction()
            }
        }
        return {
            isKeepPassword,
            handleLoginClick,
            accountRef,
            phoneRef,
            currentTab
        }
    }
})

</script>

<template>
    <div class="login-panel">
        <h1 class="title">后台管理系统</h1>
        <el-tabs type="border-card" stretch v-model="currentTab">
            <el-tab-pane name="account">
                <template #label>
                    <span>
                        <i class="el-icon-user-solid"></i>
                        账号登录
                    </span>
                </template>
                <!-- 账号登录组件 -->
                <login-account ref="accountRef" />
            </el-tab-pane>
            <el-tab-pane name="phone">
                <template #label>
                    <span>
                        <i class="el-icon-mobile-phone"></i>
                        手机登录
                    </span>
                </template>
                <!-- 手机登录组件 -->
                <login-phone ref="phoneRef" />
            </el-tab-pane>
        </el-tabs>

        <div class="account-control">
            <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
            <el-link type="primary">忘记密码</el-link>
        </div>
        <el-button type="primary" class="login-btn" size="default" @click="handleLoginClick">立即登录</el-button>
    </div>
</template>

<style scoped lang="less">
.login-panel {
    width: 320px;
    margin-bottom: 150px;

    .title {
        text-align: center;
    }

    .account-control {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
    }

    .login-btn {
        width: 100%;
        margin-top: 10px;
    }
}



/* .demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
} */
</style>