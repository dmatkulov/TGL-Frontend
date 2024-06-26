import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { appRoutes } from '../../utils/constants';

interface Props extends React.PropsWithChildren {}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const isAdminPath = location.pathname.includes('/admin');

  const isClient = user?.role === 'client';
  const isEmployee = user?.role !== 'client';

  if (!user) {
    return <Navigate to={appRoutes.login} />;
  } else if (isClient && !isAdminPath) {
    return children;
  } else if (isEmployee && isAdminPath) return children;
  return <Navigate to={appRoutes.home} />;
};

export default ProtectedRoute;
