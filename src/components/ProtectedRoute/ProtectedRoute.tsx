import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { appRoutes } from '../../utils/constants';

interface Props extends React.PropsWithChildren {}

const ProtectedRoute: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={appRoutes.login} />;
  } else if (user.role === 'client') {
    return <Navigate to={appRoutes.home} />;
  }
  return children;
};

export default ProtectedRoute;
