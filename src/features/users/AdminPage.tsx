import { Grid, useMediaQuery } from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';
import AdminNavigation from './components/AdminNavigation';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from './usersSlice';
import { appRoutes } from '../../utils/constants';

const AdminPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const user = useAppSelector(selectUser);

  if (user && user.role === 'client') {
    return <Navigate to={appRoutes.login} />;
  }
  return (
    <>
      <Grid container direction={isSmallScreen ? 'column' : 'row'}>
          <Grid item xs={3} pr={2}>
            <AdminNavigation />
          </Grid>
        <Grid item xs={9} px={3} pt={2}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminPage;
