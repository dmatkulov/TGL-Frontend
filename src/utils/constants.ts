import { UserNav } from '../types';

export const apiURL = 'http://localhost:8000';

export const serverRoute = {
  users: '/users',
  sessions: '/users/sessions',
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

export const regions = [
  {
    id: 1,
    name: 'Чуй',
  },
  {
    id: 2,
    name: 'Ыссык-Куль',
  },
  {
    id: 3,
    name: 'Ош',
  },
  {
    id: 4,
    name: 'Талас',
  },
  {
    id: 5,
    name: 'Баткен',
  },
  {
    id: 6,
    name: 'Нарын',
  },
  {
    id: 7,
    name: 'Джалалабад',
  },
];
