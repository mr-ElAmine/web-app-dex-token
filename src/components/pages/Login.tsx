import type { ReactNode } from 'react';

import LoginForm from '../form/LoginForm';

const Login = (): ReactNode => {
  return (
    <div className='flex w-full items-center justify-center'>
      <LoginForm />
    </div>
  );
};

export default Login;
