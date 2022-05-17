import {AdminHomePage,ProductPage,ProductDetail } from './../index';

export const ADMIN_ROUTES = [
    {
      path: '/admin',
      name: 'Trang Quản Trị',
      exact: true,
      component: AdminHomePage,
    },
    {
      path: '/admin/product',
      name: 'Quản trị hàng hóa',
      exact: true,
      component: ProductPage,
    },
    {
      path: '/admin/product/:id',
      name: 'Chi tiết hàng hóa',
      exact: true,
      component: ProductDetail,
    }
];