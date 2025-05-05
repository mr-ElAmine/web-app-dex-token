import * as React from 'react';

import { cn } from '@/configuration/utils';

import Button from './Button';

import type { IconType } from 'react-icons';

interface InputProps extends React.ComponentProps<'input'> {
  Icon?: IconType;
  onIconClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, Icon, onIconClick, type = 'text', ...props }, ref) => {
    return (
      <div className='relative'>
        <input
          type={type}
          className={cn(
            'border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
            Icon && 'pe-12',
          )}
          ref={ref}
          {...props}
        />
        {Icon && (
          <Button
            size='icon'
            className='absolute top-0 right-0 rounded-none rounded-r-lg border-l bg-transparent hover:bg-transparent'
            onClick={onIconClick}
            type='button'
          >
            <Icon className='h-6 w-6' />
          </Button>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };
