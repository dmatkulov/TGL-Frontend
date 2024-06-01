export const apiURL = 'http://localhost:8000';

export const serverRoute = {
  users: '/users',
  sessions: '/users/sessions',
  lastSession: '/users/sessions/lastSession',
  pups: '/pups',
  prices: '/price',
  shipments: '/shipments',
  companyAddresses: '/company-addresses',
  companyAddressesAdd: '/company-addresses/add',
  staff: '/users/staff',
  clients: '/users/clients',
  socials: '/socials',
  banned: '/banned-categories',
};

export const Roles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'manager' },
  { id: 3, name: 'client' },
];

export const ShipmentStatus = [
  { id: 1, name: 'КР_ОТПРАВЛЕНО' },
  { id: 2, name: 'КР_ПРИБЫЛО' },
  { id: 3, name: 'КНР_ОТПРАВЛЕНО' },
  { id: 4, name: 'КНР_ПРИБЫЛО' },
  { id: 5, name: 'ЗАВЕРШЕН' },
  { id: 6, name: 'ОТКАЗ' },
];
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
  information: '/profile/information',
  myProfile: '/profile/myProfile',
  profileAdmin: '/admin-profile',
  statistics: '/admin-profile/statistics',
  pups: '/admin-profile/pups',
  staff: '/admin-profile/staff',
  shipmentForm: '/admin-profile/shipmentForm',
  shipments: '/admin-profile/shipments',
  adminWarehousesAdd: '/admin-profile/warehouses-new',
  adminWarehouses: '/admin-profile/warehouses',
  adminWarehousesEdit: '/admin-profile/warehouse/:id',
  adminCompanyAddress: '/admin-profile/company-addresses',
  myAdminProfile: '/admin-profile/myProfile',
  calculate: '/calculate',
  warehouse: 'warehouseForm',
  price: '/admin-profile/price',
  priceLists: '/admin-profile/price-lists',
  priceListsAdd: '/admin-profile/price-lists/add',
  priceEdit: '/admin-profile/price/edit',
  socials: '/admin-profile/socials',
  socialsAdd: '/admin-profile/social-new',
  socialsEdit: '/admin-profile/social/:id',
  adminClients: '/admin-profile/clients',
  adminBanned: '/admin-profile/banned',
};

export const Statuses = [
  'КР_ОТПРАВЛЕНО',
  'КР_ПРИБЫЛО',
  'КНР_ОТПРАВЛЕНО',
  'КНР_ПРИБЫЛО',
  'ЗАВЕРШЕН',
  'ОТКАЗ',
];

export const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
