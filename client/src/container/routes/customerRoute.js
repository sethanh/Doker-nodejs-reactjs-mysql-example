import {CustomerPage,ProfilePage, CartPage } from './../index'; 

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
    },
    {
      path: '/cart',
      name: 'Cart',
      exact: true,
      component: CartPage,
    }
];