import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { siteConfig } from '@/constants/SiteConfig';

import MobileNavButton from '../atoms/MobileHeaderButton';
import MobileNavLinks from '../molecules/MobileNavLinks';

const MobileHeader = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}): ReactNode => {
  return (
    isOpen && (
      <div className='absolute z-50 flex h-screen w-screen flex-col backdrop-blur-sm'>
        <div className='relative mb-6 flex justify-between gap-6 p-3'>
          <Link to='/' title='Home' viewTransition>
            <div className='flex items-center space-x-4'>
              <img src={siteConfig.logoSrc} alt='Logo' className='size-9.5 rounded-md' />
              <span className='audiowide-regular text-lg font-extrabold'>{siteConfig.name}</span>
            </div>
          </Link>
          <MobileNavButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
        <div className='h-full'>
          <MobileNavLinks toggleMenu={toggleMenu} />
        </div>
      </div>
    )
  );
};

export default MobileHeader;
