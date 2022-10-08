import { lazy } from 'react';
const Home = lazy(() => import('../../pages/home/pages'));

/* Profile */
const Profile = lazy(() => import('../../pages/profile/pages'));


export const adminRoutes = [
  {
    path: '/admin/',
    exact: true,
    component: Home
  },
  {
    path: '/admin/profile',
    exact: true,
    component: Profile
  }
];
