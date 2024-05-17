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
  socials: '/socials',
};

export const Roles = [
  { id: 1, name: 'admin' },
  { id: 2, name: 'manager' },
  { id: 3, name: 'client' },
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
};

export const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
