import type { ReactNode } from 'react';

import { links } from '@/constants/Links';

import NavItem from '../molecules/NavItem';

const MainNav = (): ReactNode => {
  return (
    <div className='hidden flex-col gap-4 border-t px-4 py-6 lg:flex'>
      {links.map(({ href, label, icon }) => (
        <NavItem key={href} href={href} label={label} Icon={icon} />
      ))}
    </div>
  );
};

export default MainNav;
