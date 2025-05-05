import type { ReactNode } from 'react';

import { X, AlignJustify } from 'lucide-react';

import Button from './Button';

const MobileHeaderButton = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}): ReactNode => {
  return (
    <Button
      variant='outline'
      onClick={toggleMenu}
      className='flex size-12 items-center justify-center self-center rounded-md border-2 border-white/50 hover:bg-white/5 lg:hidden'
      aria-label='Open main menu'
    >
      {isOpen ? (
        <X className='h-10 w-10 stroke-white' />
      ) : (
        <AlignJustify className='h-10 w-10 stroke-white' />
      )}
    </Button>
  );
};

export default MobileHeaderButton;
