import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import {AXIOS_COMPLETE_EVENT_NAME, AXIOS_LOADING_EVENT_NAME} from "core/consts/axios";
import {ClientUtils} from "core/utils/client";

declare module "axios" {
  interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
    metadata: {
      startTime: Date
    }
  }
}

const DEFAULT_CONFIG = {
  baseURL: `/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const BACKDROP_MIN_VISIBLE_DURATION_IN_MS = 300;

export const Axios = (config?: any) => {
  const instance = axios.create({...DEFAULT_CONFIG, ...config});
  instance.interceptors.request.use(requestSuccessInterceptor, errorInterceptor)
  instance.interceptors.response.use(responseSuccessInterceptor, errorInterceptor)
  return instance;
}

const requestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!ClientUtils.isClient()) {
    return config;
  }

  window.dispatchEvent(new Event(AXIOS_LOADING_EVENT_NAME));
  config.metadata = {startTime: new Date()}
  return config;
}

const responseSuccessInterceptor = (response: AxiosResponse) => {
  const start = response.config.metadata.startTime;
  const current = new Date();
  const requestDuration = current.getTime() - start.getTime();

  if (!ClientUtils.isClient()) {
    return response;
  }

  if (requestDuration <= BACKDROP_MIN_VISIBLE_DURATION_IN_MS) {
    setTimeout(() => window.dispatchEvent(new Event(AXIOS_COMPLETE_EVENT_NAME)),
      BACKDROP_MIN_VISIBLE_DURATION_IN_MS - requestDuration)
  } else {
    window.dispatchEvent(new Event(AXIOS_COMPLETE_EVENT_NAME))
  }
  return response;
}

const errorInterceptor = (error: Error) => {
  if (!ClientUtils.isClient()) {
    return Promise.reject(error);
  }

  setTimeout(() => window.dispatchEvent(new Event(AXIOS_COMPLETE_EVENT_NAME)),
    BACKDROP_MIN_VISIBLE_DURATION_IN_MS)
  return Promise.reject(error);
}

export const handleAxiosError = (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data.message;
  }
  return err.message;
}