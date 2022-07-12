import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { ZHRequestInterceptors, ZHRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/es/components/loading/src/loading";
import { resolve } from "path";

const DEFAULT_LOADING: boolean = true;
class ZhRequest {
  instance: AxiosInstance;
  interceptors?: ZHRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  constructor(config: ZHRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本的信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    // 使用拦截器
    // 实例可选拦截器 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    ),
      this.instance.interceptors.response.use(
        this.interceptors?.responseInterceptor,
        this.interceptors?.responseInterceptorCatch
      );

    //   全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log("全局请求拦截器：成功");
        if (this.showLoading) {
          // 定义loading
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求中...",
            background: "rgba(0,0,0,0.5)",
          });
        }
        return config;
      },
      (err) => {
        console.log("全局请求拦截器：error");
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // console.log("全局响应拦截器：成功");

        // 移除loading
        this.loading?.close();

        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("request failed! error:");
        } else {
          return data;
        }
      },
      (err) => {
        console.log("全局响应拦截器：error");

        // 移除loading
        this.loading?.close();

        if (err.response.status === 404) {
          console.log("request failed! error: 404");
        }
        return err;
      }
    );
  }

  // 封装请求
  request<T = any>(config: ZHRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 可以对单次请求做请求与响应的拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 是否开启loading 默认为true
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // console.log(res);

          //   每次请求完成后 恢复为默认值 不影响下一次的请求
          this.showLoading = DEFAULT_LOADING;

          // 将结果返回
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
          return err;
        });
    });
  }
  //   request使用demo
  /**
     zhRequest.request({
        url:"/home/multidata",
        method: "GET",
        interceptors: {
            requestInterceptor: (config) => {
                console.log("单次请求的拦截")
                return config
            },
            responseInterceptor: (res) => {
                console.log("单次响应的拦截")
                return res
            }
        }
    })
    */

  get<T = any>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = any>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  patch<T = any>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
  delete<T = any>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  put<T = any>(config: ZHRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
}

export default ZhRequest;
