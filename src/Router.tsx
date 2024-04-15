import React from 'react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Error from './pages/Error';
import LoginSuccess from './pages/LoginSuccess';

const Home = lazy(() => import('./pages/Home'));
const Layout = lazy(() => import('./Layout'));
const AuthGoogle = lazy(() => import('./pages/AuthGoogle'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login/oauth2/code/google',
        element: <AuthGoogle />,
      },
      {
        path: 'success',
        element: <LoginSuccess />,
      },
    ],
  },
]);

export default router;
