import { createApp } from "vue";
import App from "./App.vue";

import "normalize.css";
import "./assets/css/index.less";
import router from "./router";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { setupStore } from "./stores";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { globalRegister } from "./global";

// import zhRequest from "./service";

const app = createApp(App);

app.use(createPinia());

app.use(ElementPlus, { size: "small", zIndex: 3000 });

// 注册全局属性/其它等插件功能
app.use(globalRegister);

setupStore(); // 页面刷新时 从缓存读取数据重写到pinia

app.use(router); // router放在store后面 解决刷新时页面找不到问题

// 全局注册 elementPlus 的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");

// interface DataType {
//     data: any
//     returnCode: string
//     success: boolean
// }
// zhRequest.request<DataType>({
//     url:"/home/multidata",
//     method: "GET",
//     interceptors: {
//         requestInterceptor: (config) => {
//             console.log("单次请求的拦截")
//             return config
//         },
//         responseInterceptor: (res) => {
//             console.log("单次响应的拦截")
//             return res
//         }
//     },
//     showLoading: true
// }).then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
// })
