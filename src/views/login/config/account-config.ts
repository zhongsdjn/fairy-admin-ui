// form验证规则
export const rules = {
    name: [{
        required: true,
        message: "必填",
        trigger: 'blur'
    },
    {
        pattern: /^[a-zA-C0-9]{2,10}$/,
        message: "用户名只能是大小写字母和数字的组合 最少2个字符最多10个字符",
        trigger: 'blur'
    }
    ],
    password: [{
        required: true,
        message: "必填",
        trigger: 'blur'
    },
    {
        pattern: /^[a-zA-C0-9_]{5,20}$/,
        message: "密码只能是大小写字母和数字以及下划线的组合 最少6个字符最多20个字符",
        trigger: 'blur'
    }]
}