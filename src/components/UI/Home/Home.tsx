import { Navigate, useNavigate } from 'react-router-dom';
import { appRoutes } from '../../../utils/constants';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { useEffect } from 'react';

const Home = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(appRoutes.register);
    }
  }, [user, navigate]);
  return (
    <Navigate
      to={
        user?.role === 'client' ? appRoutes.information : appRoutes.statistics
      }
    />
  );
};

export default Home;
