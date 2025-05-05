import type { ReactNode } from 'react';

import { useGetTransactionAlert } from '@/hook/use-transaction-alert';

import DialogCreateTransactionAlert from '../molecules/DialogCreateTransactionAlert';
import WalletTable from '../molecules/WalletTable';

const Alerts = (): ReactNode => {
  const { data = [], isLoading, refetch } = useGetTransactionAlert();

  return (
    <div className='flex h-full w-full justify-center bg-[var(--color-primary--dark)] p-5'>
      <div className='flex w-full flex-col gap-2'>
        <div className='flex w-full justify-end'>
          <DialogCreateTransactionAlert onSuccess={refetch} />
        </div>
        <WalletTable data={data} isLoading={isLoading} refetch={refetch} />
      </div>
    </div>
  );
};

export default Alerts;
