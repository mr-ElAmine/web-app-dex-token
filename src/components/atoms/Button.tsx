import * as React from 'react';

import { type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { Link, type LinkProps } from 'react-router-dom';

import { cn } from '@/configuration/utils';
import { buttonVariants } from '@/constants/variants/ButtonVariants';

interface CommonButtonProps extends VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = {
  to?: undefined;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  CommonButtonProps;

type ButtonAsLink = {
  to: string;
} & Omit<LinkProps, 'className' | 'children'> &
  CommonButtonProps;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (props, ref) => {
    if ('to' in props && props.to !== undefined) {
      const { to, isLoading = false, variant, size, className, children, ...linkRest } = props;

      const classes = cn(
        buttonVariants({ variant, size, className }),
        'inline-flex items-center gap-2',
      );

      return (
        <Link
          {...linkRest}
          to={to}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          viewTransition
        >
          {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
          {children}
        </Link>
      );
    } else {
      const {
        isLoading = false,
        variant,
        size,
        className,
        children,
        ...buttonRest
      } = props as ButtonAsButton;

      const { type = 'button', disabled, ...btnAttrs } = buttonRest;

      const classes = cn(
        buttonVariants({ variant, size, className }),
        'inline-flex items-center gap-2',
      );

      return (
        <button
          {...btnAttrs}
          type={type}
          disabled={isLoading || disabled}
          className={classes}
          ref={ref as React.Ref<HTMLButtonElement>}
        >
          {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
          {children}
        </button>
      );
    }
  },
);

Button.displayName = 'Button';
export default Button;
