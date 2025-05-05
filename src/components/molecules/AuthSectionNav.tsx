import type { ReactNode } from 'react';

import { LuCircleUserRound, LuLogOut } from 'react-icons/lu';

import { useAuth } from '@/hook/use-auth-context';

import Button from '../atoms/Button';

const AuthSectionNav = (): ReactNode => {
  const { isAuthenticated, logout } = useAuth();

  if (isAuthenticated) {
    return (
      <div className='flex items-center justify-between'>
        <Button to='/account' title='Account Settings' className='m-2 flex w-full gap-6'>
          <LuCircleUserRound size={40} className='min-h-6 min-w-6' />
          Account
        </Button>
        <Button
          variant='black'
          className='h-full rounded-none p-5 px-6 text-red-500'
          onClick={logout}
          size='icon'
          to='/login'
        >
          <LuLogOut />
        </Button>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col gap-4 px-4 py-6'>
      <Button to='/registration' title='Sign Up' variant='black' className='w-full'>
        Sign Up
      </Button>
      <Button to='/login' title='Sign In' className='w-full border'>
        Sign In
      </Button>
    </div>
  );
};

export default AuthSectionNav;
