import axios, { type InternalAxiosRequestConfig } from 'axios';

import { getCookie } from '@/configuration/utils/cookie';
import { config } from '@/runtime-config';

const AxiosInstance = axios.create({
  baseURL: config.VITE_REACT_APP_API_URL,
});

AxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getCookie('accessToken');
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
