import React, { FC } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';
import { Navigate } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';

interface Props extends React.PropsWithChildren {}

const ProtectedRouteForNotLogged: FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return <Navigate to={appRoutes.login} />;
  }
  return children;
};

export default ProtectedRouteForNotLogged;
