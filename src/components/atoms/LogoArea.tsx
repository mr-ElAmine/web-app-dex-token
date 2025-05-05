import type { ReactNode } from 'react';

import { Link } from 'react-router-dom';

import { siteConfig } from '@/constants/SiteConfig';

const LogoArea = (): ReactNode => {
  return (
    <div className='flex h-[67px] w-full items-center justify-center gap-6 bg-[var(--color-primary--dark)]'>
      <Link to='/' title='Home' className='flex items-center lg:space-x-4' viewTransition>
        <img src={siteConfig.logoSrc} alt='Logo' className='size-9.5 rounded-md' />
        <span className='audiowide-regular hidden text-lg font-extrabold lg:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
};

export default LogoArea;
