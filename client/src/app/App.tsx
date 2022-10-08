import React, { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import { useTranslation } from 'react-i18next'
import { successNote } from '../core/components/helpers/notefile'
import { AdminDashBoard , CustomerDashBoard} from '../core'

import {adminRoutes,customerRoutes} from './route'

import {
  BrowserRouter as Router,
  Navigate,//Redirect
  Route,
  Routes,//SWitch
  useLocation
} from 'react-router-dom'

const NotFound = lazy(() => import('../pages/404'));

const DelayedFallback = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 100);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return show && <div className='loading-screen' />;
};



const RenderApp = (props: any) => {
  const shouldRedirect = true;
  useEffect(() => {
    successNote('Thành công')
  }, []);
  return (

    <Routes>
      {adminRoutes.map((route: any, index: number) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <AdminDashBoard >
                <Suspense fallback={DelayedFallback()}>
                  <route.component {...props} />
                </Suspense>
              </AdminDashBoard>
            }
          />

        );
      })}
      {customerRoutes.map((route: any, index: number) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <CustomerDashBoard >
                <Suspense fallback={DelayedFallback()}>
                  <route.component {...props} />
                </Suspense>
              </CustomerDashBoard>
            }
          />

        );
      })}
      {/* <Route
        path="/"
        element={
          shouldRedirect
            ? (
              <Navigate replace to="/" />
            )
            : (
              <div>kkkk</div>
            )
        }
      /> */}
    </Routes>
  );
};

const App = () => {
  const token = false;

  return (
    <Router>
      <RenderApp authenticated={token} />
    </Router>
  );
}

export default App;
