import { type ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import Account from '@/components/pages/Account';
import Alerts from '@/components/pages/Alerts';
import EmailVerified from '@/components/pages/EmailVerified';
import Login from '@/components/pages/Login';
import NotFound from '@/components/pages/NotFound';
import Registration from '@/components/pages/Registration';
import Layout from '@/components/templates/Layout';
import PrivateRoute from '@/components/templates/PrivateRoute';
import PublicRoute from '@/components/templates/PublicRoute';
import AuthProvider from '@/providers/AuthProvider';

const routesForPublic = [
  { path: '/login', element: <Login />, isPrivate: false },
  { path: '/registration', element: <Registration />, isPrivate: false },
  { path: '*', element: <NotFound />, isPrivate: false },
];
const routesForAuthenticatedOnly = [
  { path: '/email-verified', element: <EmailVerified />, isPrivate: true },
  { path: '/', element: <Alerts />, isPrivate: true },
  { path: '/account', element: <Account />, isPrivate: true },
];
const allRoutes = [...routesForAuthenticatedOnly, ...routesForPublic];

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary fallback={<div>Quelque chose s’est mal passé</div>}>
        <AuthProvider>
          <Layout>
            <Outlet />
          </Layout>
        </AuthProvider>
      </ErrorBoundary>
    ),
    children: allRoutes.map(({ path, element, isPrivate }) => ({
      path,
      element: isPrivate ? (
        <PrivateRoute>{element}</PrivateRoute>
      ) : (
        <PublicRoute>{element}</PublicRoute>
      ),
    })),
  },
]);

const RoutesApp = (): ReactNode => <RouterProvider router={router} />;
export default RoutesApp;
