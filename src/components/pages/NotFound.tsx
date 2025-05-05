import type { ReactNode } from 'react';

import { AlertCircle, HomeIcon } from 'lucide-react';

import Button from '../atoms/Button';

const NotFound = (): ReactNode => {
  return (
    <div className='bg-background flex flex-col items-center justify-center'>
      <div className='space-y-6 text-center'>
        <AlertCircle className='text-muted-foreground mx-auto h-20 w-20' />
        <h1 className='text-4xl font-bold tracking-tight text-black'>404 - Page Not Found</h1>
        <p className='text-muted-foreground text-xl'>
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Button
          to='/'
          variant='outline'
          className='hover:text-primary group hover:bg-black hover:shadow-2xl'
        >
          <div className='inline-flex items-center'>
            <HomeIcon className='mr-2 h-4 w-4' />
            <span className='group-hover:text-white'>Back to Dashboard</span>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
