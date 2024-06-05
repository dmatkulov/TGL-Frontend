import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../components/UI/Home/Home';
import Register from '../features/users/Register';
import Login from '../features/users/Login';
import { appRoutes } from '../utils/constants';
import UserPage from '../features/users/UserPage';
import NotFound from '../components/UI/NotFound/NotFound';
import Orders from '../features/users/containers/Orders';
import Tracking from '../features/users/containers/Tracking';
import Addresses from '../features/users/containers/Addresses';
import OrdersHistory from '../features/users/containers/OrdersHistory';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import AdminPage from '../features/users/AdminPage';
import Statistics from '../features/users/containers/Statistics';
import Staff from '../features/users/containers/Staff';
import ShipmentsForm from '../features/shipments/containers/ShipmentsForm';
import Shipments from '../features/shipments/containers/Shipments';
import WarehousesList from '../features/users/containers/WarehousesList/WarehousesList';
import CompanyAddresses from '../features/companyAddress/CompanyAddresses';
import EditWarehouse from '../features/warehouses/components/EditWarehouse';
import NewWarehouse from '../features/warehouses/components/NewWarehouse';
import Calculator from '../components/UI/Calculator/Calculator';
import Price from '../features/prices/Price';
import PriceLists from '../features/priceLists/PriceLists';
import PriceListsForm from '../features/priceLists/components/PriceListForm';
import Socials from '../features/socials/Socials';
import Clients from '../features/users/containers/Clients';
import Information from '../features/users/components/Information';
import Banned from '../features/banned/Banned';
import Profile from '../features/users/containers/Profile';

export const router = createBrowserRouter([
  {
    path: appRoutes.home,
    element: <Layout />,
    children: [
      {
        path: appRoutes.home,
        element: <Home />,
      },
      {
        path: appRoutes.register,
        element: <Register />,
      },
      {
        path: appRoutes.login,
        element: <Login />,
      },
      {
        path: appRoutes.calculate,
        element: <Calculator />,
      },
      {
        path: appRoutes.profile,
        element: <UserPage />,
        children: [
          {
            path: appRoutes.tracking,
            element: <Tracking />,
          },
          {
            path: appRoutes.orders,
            element: <Orders />,
          },
          {
            path: appRoutes.address,
            element: <Addresses />,
          },
          {
            path: appRoutes.history,
            element: <OrdersHistory />,
          },
          {
            path: appRoutes.information,
            element: <Information />,
          },
          {
            path: appRoutes.myProfile,
            element: <Profile />,
          },
        ],
      },
      {
        path: appRoutes.profileAdmin,
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          {
            path: appRoutes.statistics,
            element: <Statistics />,
          },
          {
            path: appRoutes.pups,
            element: <Addresses />,
          },
          {
            path: appRoutes.staff,
            element: <Staff />,
          },
          {
            path: appRoutes.shipmentForm,
            element: <ShipmentsForm />,
          },
          {
            path: appRoutes.shipments,
            element: <Shipments />,
          },
          {
            path: appRoutes.adminWarehouses,
            element: <WarehousesList />,
          },
          {
            path: appRoutes.adminClients,
            element: <Clients />,
          },
          {
            path: appRoutes.adminWarehousesAdd,
            element: <NewWarehouse />,
          },
          {
            path: appRoutes.adminWarehousesEdit,
            element: <EditWarehouse />,
          },
          {
            path: appRoutes.adminCompanyAddress,
            element: <CompanyAddresses />,
          },
          {
            path: appRoutes.price,
            element: <Price />,
          },
          {
            path: appRoutes.socials,
            element: <Socials />,
          },
          {
            path: appRoutes.priceLists,
            element: <PriceLists />,
          },
          {
            path: appRoutes.priceListsAdd,
            element: <PriceListsForm />,
          },
          {
            path: appRoutes.adminBanned,
            element: <Banned />,
          },
          {
            path: appRoutes.myAdminProfile,
            element: <Profile />,
          },
        ],
      },
      {
        path: appRoutes.notFound,
        element: <NotFound />,
      },
    ],
  },
]);
