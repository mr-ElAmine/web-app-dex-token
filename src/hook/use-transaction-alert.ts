import {
  useMutation,
  useQuery,
  type UseQueryResult,
  type UseMutationResult,
} from '@tanstack/react-query';

import type {
  CreateTransactionAlertType,
  TransactionAlertType,
} from '@/configuration/utils/zodParser';
import AxiosInstance from '@/lib/axios';

import type { AxiosError } from 'axios';

interface DefaultError {
  message: string;
}

export const useGetTransactionAlert = (): UseQueryResult<
  TransactionAlertType[],
  AxiosError<DefaultError>
> => {
  return useQuery({
    queryKey: ['transaction-alerts'],
    queryFn: () =>
      AxiosInstance.get<TransactionAlertType[]>('/transaction-alert').then((res) => res.data),
  });
};

export const useDeleteTransactionAlert = (): UseMutationResult<
  void,
  AxiosError<DefaultError>,
  string
> => {
  return useMutation({
    mutationFn: (alertId: string) =>
      AxiosInstance.delete('/transaction-alert', { data: { alertId } }).then(() => undefined),
    onSuccess: () => {},
  });
};

export const useCreateTransactionAlert = (): UseMutationResult<
  TransactionAlertType,
  AxiosError<DefaultError>,
  CreateTransactionAlertType
> => {
  return useMutation({
    mutationFn: (newAlert: CreateTransactionAlertType) =>
      AxiosInstance.post<TransactionAlertType>('/transaction-alert', newAlert).then(
        (res) => res.data,
      ),
    onSuccess: () => {},
  });
};
