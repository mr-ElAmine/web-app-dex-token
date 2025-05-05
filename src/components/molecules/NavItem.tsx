import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import type { IconType } from 'react-icons';

const NavItem = ({
  href,
  label,
  Icon,
}: {
  href: string;
  label: string;
  Icon: IconType;
}): ReactNode => {
  return (
    <Link
      to={href}
      className='border-primary w-full border-2 bg-[var(--color-primary--dark)]/50 p-1 text-white hover:bg-black/[20%]'
      viewTransition
    >
      <div className='flex items-center justify-center border-2 border-[var(--color-primary--light)] p-2'>
        <Icon className='size-6' />

        <div className='flex w-full justify-center'>{label}</div>
      </div>
    </Link>
  );
};

export default NavItem;
