import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hook/use-auth-context';

const PrivateRoute = ({ children }: { children: ReactNode }): ReactNode => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { pathname } = useLocation();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to='/login' state={{ from: pathname }} replace />;
  if (user && !user.emailVerified && pathname !== '/email-verified')
    return <Navigate to='/email-verified' replace />;
  if (user && user.emailVerified && pathname === '/email-verified')
    return <Navigate to='/' replace />;

  return children;
};

export default PrivateRoute;
