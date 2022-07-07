export default LoginAccount

<script lang="ts">
import { ref } from 'vue'
import { defineComponent, reactive } from 'vue'
import { rules } from '../config/account-config'
import { LoginModule } from '../../../stores/login/login'
import LocalCache from "../../../utils/cache"

import { ElForm } from 'element-plus'

export default defineComponent({
    setup() {
        const account = reactive({
            // 从缓存获取name和password  如果未曾缓存 那么默认为空
            name: LocalCache.getCache("name") ?? "",
            password: LocalCache.getCache("password") ?? ""
        })

        const formRef = ref<InstanceType<typeof ElForm>>()

        const store = LoginModule()
        const loginAction = (isKeepPassword: boolean) => {
            formRef.value?.validate((valid: boolean) => {
                // 用户名、密码通过验证才真正去执行登录逻辑
                if (valid) {
                    // 是否需要记住密码
                    if (isKeepPassword) {
                        LocalCache.setCache('name', account.name)
                        LocalCache.setCache('password', account.password)
                    } else {
                        LocalCache.deleteCache('name')
                        LocalCache.deleteCache('password')
                    }
                    // 开始进行登录验证
                    store.accountLoginAction({ ...account })
                }
            })
        }

        return {
            account,
            rules,
            loginAction,
            formRef
        }
    }
})
</script>

<template>
    <div class="login-account">
        <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
            <el-form-item label="账号:" prop="name">
                <el-input v-model="account.name"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input v-model="account.password"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
</style>
