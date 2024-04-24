import { Grid } from '@mui/material';
import UserNavigation from './components/UserNavigation';
import {Outlet, useNavigate} from 'react-router-dom';
import Profile from './containers/Profile';
import {useAppSelector} from '../../app/hooks';
import {selectUser} from './usersSlice';
import {appRoutes} from '../../utils/constants';
import {useEffect} from 'react';

const UserPage = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if( user?.role === 'super' || user?.role === 'admin' || user?.role === 'manager') {
      navigate(appRoutes.profileAdmin);
    }
  }, [user]);
  return (
    <>
      <Grid container>
        <Grid item xs={12} bgcolor="#f5f5f5" px={3} mb={5}>
          <Profile />
        </Grid>
        <Grid item xs={4} pr={2} borderRight="1px solid #f5f5f5">
          <UserNavigation />
        </Grid>
        <Grid item xs={8} pl={2}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;
