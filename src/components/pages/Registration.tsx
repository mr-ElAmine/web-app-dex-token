import type { ReactNode } from 'react';

import RegistrationForm from '../form/RegistrationForm';

const Registration = (): ReactNode => {
  return (
    <div className='flex w-full items-center justify-center'>
      <RegistrationForm />
    </div>
  );
};

export default Registration;
