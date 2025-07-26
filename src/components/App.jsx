import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserThunk } from 'redux/auth/operations';

import RestrictedRouteLogin from './RestrictedRouteLogin';
import RestrictedRouteRegister from './RestrictedRouteRegister';
import PrivateRoute from './PrivateRoute';

import { Loader } from './Loader';
import Navigation from './Navigation';
import { selectAuthIsLoading } from 'redux/auth/selectors';

const HomePage = lazy(() => import('pages/HomePage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();

  const isRefreshing = useSelector(selectAuthIsLoading);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  const appRoutes = [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/register',
      element: (
        <RestrictedRouteRegister>
          <RegisterPage />
        </RestrictedRouteRegister>
      ),
    },
    {
      path: '/login',
      element: (
        <RestrictedRouteLogin>
          <LoginPage />
        </RestrictedRouteLogin>
      ),
    },
    {
      path: '/contacts',
      element: (
        <PrivateRoute>
          <ContactsPage />
        </PrivateRoute>
      ),
    },
  ];

  return (
    <>
      <Navigation />

      {isRefreshing ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      )}
    </>
  );
};
