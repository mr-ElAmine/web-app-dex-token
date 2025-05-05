import type { ReactNode } from 'react';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import { links } from '@/constants/Links';

const MobileNavLinks = ({ toggleMenu }: { toggleMenu: () => void }): ReactNode => {
  return (
    <div className='flex flex-col gap-4 px-2 py-4'>
      {links.map(({ href, label }, linkIndex) => (
        <Link
          to={href}
          key={href}
          className='w-full rounded-md bg-[var(--color-primary--dark)]/70 p-1 text-white backdrop-blur-xs'
          onClick={toggleMenu}
          viewTransition
        >
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            className='flex h-full flex-row justify-between rounded-md border-2 border-[var(--color-primary--light)] p-2'
          >
            {label}
            <ArrowRight className='min-h-5 min-w-5' />
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default MobileNavLinks;
