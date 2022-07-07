export default LoginPhone

<script lang="ts">
import { ref } from 'vue';
import { rules } from '../config/phone-config'
import { defineComponent, reactive } from 'vue'
import { ElForm } from 'element-plus'
import { LoginModule } from '../../../stores/login/login'
export default defineComponent({
    setup() {
        const phone = reactive({
            number: "",
            code: ""
        })

        const formRef = ref<InstanceType<typeof ElForm>>()
        const store = LoginModule()

        const loginAction = () => {
            formRef.value?.validate((valid: boolean) => {
                // 用户名、密码通过验证才真正去执行登录逻辑
                if (valid) {
                    // 开始进行登录验证
                    console.log("手机号验证ok")
                    
                    store.phoneLoginAction({ ...phone })
                } else {
                    console.log("手机号验证error")
                }
            })
        }

         return {
            phone,
            rules,
            loginAction,
            formRef
        }
    }
})

</script>

<template>
    <div class="login-account">
        <el-form label-width="60px" :rules="rules" :model="phone">
            <el-form-item label="手机号:" prop="number">
                <el-input v-model="phone.number"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" prop="code">
                <div class="get-code">
                    <el-input v-model="phone.code"></el-input>
                    <el-button type="primary" class="get-btn">获取验证码</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped lang="less">
.get-code {
    display: flex;

    .get-btn {
        margin-left: 8px;
    }
}
</style>

