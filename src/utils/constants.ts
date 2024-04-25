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
  calculate: '/calculate',
};
