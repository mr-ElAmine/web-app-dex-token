import { useMutation, useQuery, type UseQueryResult, type UseMutationResult } from 'react-query';

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
  return useQuery<TransactionAlertType[], AxiosError<DefaultError>>('transaction-alerts', () =>
    AxiosInstance.get<TransactionAlertType[]>('/transaction-alert').then((res) => res.data),
  );
};

export const useDeleteTransactionAlert = (): UseMutationResult<
  unknown,
  AxiosError<DefaultError>,
  string
> => {
  return useMutation((alertId: string) =>
    AxiosInstance.delete('/transaction-alert', {
      data: { alertId },
    }).then(() => undefined),
  );
};

export const useCreateTransactionAlert = (): UseMutationResult<
  unknown,
  AxiosError<DefaultError>,
  CreateTransactionAlertType
> => {
  return useMutation((newAlert: CreateTransactionAlertType) =>
    AxiosInstance.post('/transaction-alert', newAlert).then((res) => res.data),
  );
};
