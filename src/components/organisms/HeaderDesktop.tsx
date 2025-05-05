import { type ReactNode } from 'react';

import LogoArea from '../atoms/LogoArea';
import AuthSectionNav from '../molecules/AuthSectionNav';
import MainNav from '../molecules/MainNav';

const HeaderDesktop = (): ReactNode => (
  <header className='primary fixed z-50 hidden h-screen w-60 border-e bg-[var(--color-primary--dark)] backdrop-blur lg:inline-block'>
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <LogoArea />
      <nav className='flex h-full w-full flex-col justify-between'>
        <MainNav />
        <div className='border-t bg-[var(--color-primary--dark)]'>
          <AuthSectionNav />
        </div>
      </nav>
    </div>
  </header>
);

export default HeaderDesktop;
