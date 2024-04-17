import { Grid } from '@mui/material';
import UserNavigation from './components/UserNavigation';
import { Outlet } from 'react-router-dom';
import Profile from './containers/Profile';

const UserPage = () => {
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
