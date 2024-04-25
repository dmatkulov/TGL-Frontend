import {UserNav} from '../types/types.User';

export const apiURL = 'http://localhost:8000';

export const serverRoute = {
  users: '/users',
  sessions: '/users/sessions',
  pups: '/pups',
  prices: '/price',
};

export const appRoutes = {
  notFound: '*',
  home: '/',
  register: '/register',
  login: '/login',
  profile: '/profile',
  tracking: '/profile/tracking',
  orders: '/profile/orders',
  address: '/profile/address',
  history: '/profile/history',
  profileAdmin: '/admin-profile',
  statistics: '/admin-profile/statistics',
  pups: '/admin-profile/pups',
  staff: '/admin-profile/staff',
  shipments: '/admin-profile/shipments',
  adminWarehousesAdd: '/admin-profile/warehouses-form',
  adminWarehouses: '/admin-profile/warehouses',
};

export const userLinks: UserNav[] = [
  {
    id: 1,
    name: 'Трекинг по номеру',
    navLink: appRoutes.tracking,
  },
  {
    id: 2,
    name: 'Мои заказы',
    navLink: appRoutes.orders,
  },
  {
    id: 3,
    name: 'Адреса складов',
    navLink: appRoutes.address,
  },
  {
    id: 4,
    name: 'История заказов',
    navLink: appRoutes.history,
  },
];

export const adminLinks: UserNav[] = [
  {
    id: 1,
    name: 'Статистика',
    navLink: appRoutes.statistics,
  },
  {
    id: 2,
    name: 'ПВЗ',
    navLink: appRoutes.pups,
  },
  {
    id: 3,
    name: 'Сотрудники',
    navLink: appRoutes.staff,
  },
  {
    id: 4,
    name: 'Заказы клиентов',
    navLink: appRoutes.shipments,
  },
  {
    id: 5,
    name: 'Склад в Китае',
    navLink: appRoutes.adminWarehouses,
  },
];
