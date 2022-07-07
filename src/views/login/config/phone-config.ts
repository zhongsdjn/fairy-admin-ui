// form验证规则
export const rules = {
  number: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-C0-9]{5,10}$/,
      message: "用户名只能是大小写字母和数字的组合 最少5个字符最多10个字符",
      trigger: "blur",
    },
  ],
  code: [
    {
      required: true,
      message: "必填",
      trigger: "blur",
    },
    {
      pattern: /^[a-zA-C0-9_]{3,20}$/,
      message:
        "密码只能是大小写字母和数字以及下划线的组合 最少6个字符最多20个字符",
      trigger: "blur",
    },
  ],
};
