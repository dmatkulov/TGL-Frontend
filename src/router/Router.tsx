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
import WarehouseForm from '../features/warehouses/components/WarehouseForm';

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
        path: appRoutes.profile,
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
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
        ],
      },
      {
        path: appRoutes.warehouse,
        element: (
          <ProtectedRoute>
            <WarehouseForm />
          </ProtectedRoute>
        ),
      },
      {
        path: appRoutes.notFound,
        element: <NotFound />,
      },
    ],
  },
]);
