import { Grid, useMediaQuery } from '@mui/material';
import UserNavigation from './components/UserNavigation';
import { Outlet } from 'react-router-dom';

const UserPage = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={3}
          pr={2}
          sx={{ display: isSmallScreen ? 'none' : 'block' }}
        >
          <UserNavigation />
        </Grid>
        <Grid item xs={12} px={3} pt={2} sm={isSmallScreen ? false : 9}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;
