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
  track: '/profile/track',
  orders: '/profile/orders',
  address: '/profile/address',
  history: '/profile/history',
};

export const userLinks: UserNav[] = [
  {
    id: 1,
    name: 'Трекинг по номеру',
    navLink: appRoutes.track,
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
