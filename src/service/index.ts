import ZhRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";

import localCache from "../utils/cache";

const zhRequest = new ZhRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log("请求：ok");
      const token = localCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch: (error) => {
      console.log("请求：error");
      return error;
    },
    responseInterceptor(config) {
      console.log("响应：ok");
      return config;
    },
    responseInterceptorCatch(error) {
      console.log("响应：error");
      return error;
    },
  },
});
export default zhRequest;
