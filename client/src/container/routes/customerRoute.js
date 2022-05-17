import {CustomerPage,ProfilePage } from './../index'; 

export const CUSTOMER_ROUTES = [
    {
      path: '/home',
      name: 'Customer Home',
      exact: true,
      component: CustomerPage,
    },
    {
      path: '/profile',
      name: 'Customer Profile',
      exact: true,
      component: ProfilePage,
    }
];