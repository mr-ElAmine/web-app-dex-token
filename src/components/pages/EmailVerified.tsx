import type { ReactNode } from 'react';

import EmailVerifiedForm from '@/components/form/EmailVerifiedForm';

const EmailVerified = (): ReactNode => {
  return (
    <div className='flex w-full items-center justify-center'>
      <EmailVerifiedForm />
    </div>
  );
};

export default EmailVerified;
