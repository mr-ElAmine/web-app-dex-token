import type { ReactNode, HTMLAttributes } from 'react';

import { cn } from '@/configuration/utils';

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode => {
  return <div className={cn('bg-primary--light/45 animate-pulse', className)} {...props} />;
};

export default Skeleton;
