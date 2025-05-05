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
  return useMutation<AxiosResponse<LoginResponse>, AxiosError<DefaultError>, LoginFormInput>(
    (credentials) => AxiosInstance.post<LoginResponse>('/auth/login', credentials),
    {
      onSuccess: (res) => {
        setCookie('accessToken', res.data.accessToken);
        setCookie('refreshToken', res.data.refreshToken);
      },
    },
  );
};

export const useRegister = (): UseMutationResult<
  AxiosResponse<DefaultResponse>,
  AxiosError<DefaultError>,
  RegistrationFormInput,
  unknown
> => {
  return useMutation((payload: RegistrationFormInput) =>
    AxiosInstance.post('/auth/registration', payload),
  );
};

export const useRefreshToken = (): ReturnType<typeof useMutation<LoginResponse, unknown, void>> => {
  return useMutation(() =>
    AxiosInstance.post<LoginResponse>('/auth/refresh', {
      refreshToken: getCookie('refreshToken'),
    }).then((res) => {
      setCookie('accessToken', res.data.accessToken);
      setCookie('refreshToken', res.data.refreshToken);
      return res.data;
    }),
  );
};

export const useSendEmailVerification = (): ReturnType<
  typeof useMutation<unknown, unknown, void>
> => {
  return useMutation(() => AxiosInstance.post('/auth/send-email-verification'));
};

export const useVerifyEmail = (): ReturnType<
  typeof useMutation<unknown, unknown, { pin: string }>
> => {
  return useMutation((payload: { pin: string }) =>
    AxiosInstance.post('/auth/verity-email', payload),
  );
};
