import { lazy } from 'react';
const Home = lazy(() => import('../../pages/home/pages'));

/* Profile */
const Profile = lazy(() => import('../../pages/profile/pages'));


export const customerRoutes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/profile',
    exact: true,
    component: Profile
  }
];
