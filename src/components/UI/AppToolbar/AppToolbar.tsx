import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import GuestMenu from './GuestMenu';
import UserMenu from './UserMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TechGear Logistics
          </Typography>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Тут телефоны для связи
          </Typography>
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
