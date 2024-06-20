import { useState } from 'react';
import { AppBar, Box, CssBaseline, Grid, IconButton, styled, Toolbar, Typography, useMediaQuery } from '@mui/material';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from './DrawerMenu';
import GuestMenu from './GuestMenu';
import { appRoutes } from '../../../utils/constants';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:599px)');

  const [mobileOpen, setMobileOpen] = useState(false);

  if (user === undefined) {
    return null;
  }
  
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {!user ? (
                <Link to={appRoutes.register}>TechGear Logistics</Link>
              ) : user?.role === 'client' ? (
                <Link to={appRoutes.information}>TechGear Logistics</Link>
              ) : (
                <Link to={appRoutes.statistics}>TechGear Logistics</Link>
              )}
            </Typography>
            <Typography component="div" sx={{ flexGrow: 1, visibility: isExtraSmallScreen ? 'hidden' : 'none' }}>
              <Link to={appRoutes.calculate}>Калькулятор</Link>
            </Typography>
            <Box sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
              {user ? <UserMenu user={user} /> : <GuestMenu />}
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      <DrawerMenu open={mobileOpen} toggleDrawer={handleDrawerToggle} />
    </Box>
  );
};

export default AppToolbar;
