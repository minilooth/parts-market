import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse, CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios';

import {AxiosCompleteEventName, AxiosLoadingEventName} from '@core/consts/axios';
import {ClientUtils} from '@core/utils/client';

declare module 'axios' {
  interface InternalAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    headers: AxiosRequestHeaders;
    metadata: {
      startTime: Date
    }
  }
}

const DefaultConfig: CreateAxiosDefaults = {
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: true
}

export const BACKDROP_MIN_VISIBLE_DURATION_IN_MS = 300;

export const Axios = (config?: CreateAxiosDefaults) => {
  const instance = axios.create({...DefaultConfig, ...config});
  instance.interceptors.request.use(requestSuccessInterceptor, errorInterceptor)
  instance.interceptors.response.use(responseSuccessInterceptor, errorInterceptor)
  return instance;
}

const requestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  if (!ClientUtils.isClient()) {
    return config;
  }

  window.dispatchEvent(new Event(AxiosLoadingEventName));
  config.metadata = {startTime: new Date()}
  return config;
}

const responseSuccessInterceptor = (response: AxiosResponse) => {
  if (!ClientUtils.isClient()) {
    return response;
  }

  const start = response.config.metadata.startTime;
  const current = new Date();
  const requestDuration = current.getTime() - start.getTime();

  if (requestDuration <= BACKDROP_MIN_VISIBLE_DURATION_IN_MS) {
    setTimeout(() => window.dispatchEvent(new Event(AxiosCompleteEventName)),
      BACKDROP_MIN_VISIBLE_DURATION_IN_MS - requestDuration)
  } else {
    window.dispatchEvent(new Event(AxiosCompleteEventName))
  }
  return response;
}

const errorInterceptor = (error: Error) => {
  if (!ClientUtils.isClient()) {
    return Promise.reject(error);
  }

  setTimeout(() => window.dispatchEvent(new Event(AxiosCompleteEventName)),
    BACKDROP_MIN_VISIBLE_DURATION_IN_MS)
  return Promise.reject(error);
}

export const handleAxiosError = (err: Error | AxiosError) => {
  if (axios.isAxiosError(err)) {
    return err.response?.data.message;
  }
  return err.message;
}