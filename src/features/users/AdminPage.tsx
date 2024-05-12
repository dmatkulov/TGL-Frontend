import { Grid, useMediaQuery } from '@mui/material';
import Profile from './containers/Profile';
import { Outlet } from 'react-router-dom';
import AdminNavigation from './components/AdminNavigation';

const AdminPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:760px)');

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
