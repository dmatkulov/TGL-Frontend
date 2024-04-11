import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Grid,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerMenu from './DrawerMenu';
import GuestMenu from './GuestMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="sticky" sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, ml: 'auto', display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TechGear Logistics
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to="/">Контакты</Link>
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
