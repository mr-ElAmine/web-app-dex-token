import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { getCookie, setCookie } from '@/configuration/utils/cookie';
import AxiosInstance from '@/lib/axios';

import type { AxiosError, AxiosResponse } from 'axios';

export interface LoginFormInput {
  email: string;
  password: string;
}
export interface RegistrationFormInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface DefaultResponse {
  message: string;
}

interface DefaultError {
  message: string;
}

export const useLogin = (): UseMutationResult<
  AxiosResponse<LoginResponse>,
  AxiosError<DefaultError>,
  LoginFormInput
> => {
  return useMutation<AxiosResponse<LoginResponse>, AxiosError<DefaultError>, LoginFormInput>({
    mutationFn: (credentials) => AxiosInstance.post<LoginResponse>('/auth/login', credentials),
    onSuccess: (res) => {
      setCookie('accessToken', res.data.accessToken);
      setCookie('refreshToken', res.data.refreshToken);
    },
  });
};

export const useRegister = (): UseMutationResult<
  AxiosResponse<DefaultResponse>,
  AxiosError<DefaultError>,
  RegistrationFormInput
> => {
  return useMutation<
    AxiosResponse<DefaultResponse>,
    AxiosError<DefaultError>,
    RegistrationFormInput
  >({
    mutationFn: (payload) => AxiosInstance.post<DefaultResponse>('/auth/registration', payload),
  });
};

export const useRefreshToken = (): UseMutationResult<
  LoginResponse,
  AxiosError<DefaultError>,
  void
> => {
  return useMutation<LoginResponse, AxiosError<DefaultError>, void>({
    mutationFn: () =>
      AxiosInstance.post<LoginResponse>('/auth/refresh', {
        refreshToken: getCookie('refreshToken'),
      }).then((res) => {
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);
        return res.data;
      }),
  });
};

export const useSendEmailVerification = (): UseMutationResult<
  void,
  AxiosError<DefaultError>,
  void
> => {
  return useMutation<void, AxiosError<DefaultError>, void>({
    mutationFn: () => AxiosInstance.post('/auth/send-email-verification').then(() => {}),
  });
};

export const useVerifyEmail = (): UseMutationResult<
  void,
  AxiosError<DefaultError>,
  { pin: string }
> => {
  return useMutation<void, AxiosError<DefaultError>, { pin: string }>({
    mutationFn: (payload) => AxiosInstance.post('/auth/verify-email', payload).then(() => {}),
  });
};
