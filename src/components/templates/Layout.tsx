import { useEffect, type ReactNode } from 'react';

import { LuLoaderCircle } from 'react-icons/lu';

import { siteConfig } from '@/constants/SiteConfig';
import { useAuth } from '@/hook/use-auth-context';
import { useMenu } from '@/hook/use-menu';

import MobileHeaderButton from '../atoms/MobileHeaderButton';
import Toaster from '../atoms/Toaster';
import HeaderDesktop from '../organisms/HeaderDesktop';
import MobileHeader from '../organisms/MobileHeader';

interface LayoutProps {
  desktopOffsetClass?: string;
  children: ReactNode;
}

const Layout = ({ desktopOffsetClass = 'lg:ml-60', children }: LayoutProps): ReactNode => {
  const { isOpen, toggle } = useMenu();
  const { isLoading } = useAuth();

  useEffect(() => {
    document.title = siteConfig.name;
  }, []);

  return (
    <div className='custom-gradient flex min-h-screen'>
      <HeaderDesktop />
      <MobileHeader isOpen={isOpen} toggleMenu={toggle} />

      <main className={`flex w-full flex-col ${desktopOffsetClass}`}>
        <div className='fixed z-20 flex h-16 w-full items-center space-x-3 border-b bg-[var(--color-primary--dark)] p-4'>
          <MobileHeaderButton isOpen={isOpen} toggleMenu={toggle} />
        </div>

        <div className='z-10 mt-16 flex w-full flex-grow items-center justify-center'>
          {isLoading ? (
            <LuLoaderCircle size={32} className='min-h-8 min-w-8 animate-spin' />
          ) : (
            children
          )}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
