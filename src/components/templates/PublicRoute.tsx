import type { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hook/use-auth-context';

const PublicRoute = ({ children }: { children: ReactNode }): ReactNode => {
  const { isAuthenticated, isLoading } = useAuth();
  const { pathname } = useLocation();

  if (isLoading) return null;
  if ((isAuthenticated && ['/login', '/registration'].includes(pathname)) || isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default PublicRoute;
