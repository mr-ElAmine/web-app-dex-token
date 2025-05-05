import type { ReactNode } from 'react';

import { LuCopy } from 'react-icons/lu';

import type { TransactionAlertType } from '@/configuration/utils/zodParser';

import Button from '../atoms/Button';
import TableHandler, { type Column } from '../molecules/TableHandler';

import DialogDeleteTransactionAlert from './DialogDeleteTransactionAlert';

const WalletTable = ({
  data,
  isLoading,
  refetch,
}: {
  data: TransactionAlertType[];
  isLoading: boolean;
  refetch: () => void;
}): ReactNode => {
  const columns: Column<TransactionAlertType>[] = [
    {
      header: 'Network',
      accessor: 'chainId',
      className: 'w-[100px] font-medium',
    },
    {
      header: 'Address',
      accessor: 'address',
      className: 'w-[200px]',
    },
    {
      header: 'Email',
      accessor: 'email',
      className: 'w-[400px]',
    },
    {
      header: 'Updated At',
      accessor: 'updatedAt',
      cell: (row) => (row.updatedAt ? new Date(row.updatedAt).toLocaleString() : 'N/A'),
      className: 'w-[200px]',
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className='flex gap-2'>
          <Button
            size='icon'
            className='border'
            aria-label='Copy wallet'
            onClick={() => console.log('Copy wallet:', row.id)}
          >
            <LuCopy />
          </Button>
          <DialogDeleteTransactionAlert
            onConfirm={() => {
              refetch();
            }}
            alertId={row.id}
          />
        </div>
      ),
      className: 'w-[80px] align-end',
    },
  ];

  return (
    <TableHandler<TransactionAlertType>
      isLoading={isLoading}
      columns={columns}
      data={data}
      caption='A list of your recent wallet entries.'
    />
  );
};

export default WalletTable;
