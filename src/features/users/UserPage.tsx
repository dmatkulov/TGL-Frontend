import { Grid, useMediaQuery } from '@mui/material';
import UserNavigation from './components/UserNavigation';
import { Outlet, useNavigate } from 'react-router-dom';
import Profile from './containers/Profile';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './usersSlice';
import { appRoutes } from '../../utils/constants';
import { useEffect } from 'react';

const UserPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:760px)');

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      user?.role === 'super' ||
      user?.role === 'admin' ||
      user?.role === 'manager'
    ) {
      navigate(appRoutes.profileAdmin);
    }
  }, [navigate, user]);
  return (
    <>
      <Grid container direction={isSmallScreen ? 'column' : 'row'}>
        <Grid
          item
          xs={12}
          px={3}
          mb={5}
          pb={4}
          sx={{ borderBottom: '1px solid #5F9EA0' }}
        >
          <Profile />
        </Grid>
        <Grid item xs={3} pr={2}>
          <UserNavigation />
        </Grid>
        <Grid item xs={9} px={3} pt={2}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;
