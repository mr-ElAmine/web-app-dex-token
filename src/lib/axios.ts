import axios, { type InternalAxiosRequestConfig } from 'axios';

import { config } from '@/configuration/utils/config';
import { getCookie } from '@/configuration/utils/cookie';

const AxiosInstance = axios.create({
  baseURL: config.REACT_APP_API_URL,
});

AxiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getCookie('accessToken');
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosInstance;
