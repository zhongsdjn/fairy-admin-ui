import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ZHRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface ZHRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: ZHRequestInterceptors<T>;
  showLoading?: boolean
}
