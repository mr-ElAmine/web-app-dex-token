import type { ReactNode } from 'react';

import { cn } from '@/configuration/utils';

import Skeleton from '../atoms/Skeleton';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../atoms/Table';

export interface Column<T> {
  header: ReactNode;
  accessor?: keyof T;
  className?: string;
  cell?: (row: T) => ReactNode;
}

export interface TableHandlerProps<T> {
  isLoading?: boolean;
  columns: Column<T>[];
  data: T[];
  caption: string;
}

const TableHandler = <T extends object>({
  isLoading = false,
  columns,
  data,
  caption,
}: TableHandlerProps<T>): ReactNode => {
  return (
    <Table>
      {data.length === 0 && !isLoading && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className={cn(data.length === 0 && !isLoading && 'border-b')}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={cn(col.className, rowIndex % 2 !== 0 && 'bg-primary/40')}
                  >
                    <Skeleton className='h-5 w-full' />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className='hover:bg-primary'>
                {columns.map((col, colIndex) => {
                  const content = col.cell ? col.cell(row) : String(row[col.accessor!]);
                  return (
                    <TableCell
                      key={colIndex}
                      className={cn(col.className, rowIndex % 2 !== 0 && 'bg-primary/40')}
                    >
                      {content}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default TableHandler;
