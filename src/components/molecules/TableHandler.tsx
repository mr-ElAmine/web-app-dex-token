import { useEffect, useState, type ReactNode } from 'react';

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
  minLoadingTime?: number;
}

const TableHandler = <T extends object>({
  isLoading = false,
  columns,
  data,
  caption,
  minLoadingTime = 1000,
}: TableHandlerProps<T>): ReactNode => {
  const [showLoader, setShowLoader] = useState(isLoading);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (isLoading) {
      setStartTime(Date.now());
      setShowLoader(true);
      return;
    }
    const elapsed = Date.now() - startTime;
    const remaining = minLoadingTime - elapsed;
    if (remaining > 0) {
      const timer = setTimeout(() => setShowLoader(false), remaining);
      return () => clearTimeout(timer);
    } else {
      setShowLoader(false);
    }
  }, [isLoading, minLoadingTime, startTime]);
  return (
    <Table>
      {data.length === 0 && !showLoader && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {columns.map((col, idx) => (
            <TableHead key={idx} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className={cn(data.length === 0 && !showLoader && 'border-b')}>
        {showLoader
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
