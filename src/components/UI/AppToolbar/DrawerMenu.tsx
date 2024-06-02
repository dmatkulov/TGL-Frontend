import React  from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  Stack,
  Typography, useMediaQuery,
} from '@mui/material';
import { appRoutes } from '../../../utils/constants';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserNavigation from '../../../features/users/components/UserNavigation';
import AdminNavigation from '../../../features/users/components/AdminNavigation';

interface Props {
  open: boolean;
  toggleDrawer: React.MouseEventHandler;
  window?: () => Window;
}

const drawerWidth = 320;
const DrawerMenu: React.FC<Props> = ({ open, toggleDrawer, window }) => {
  const user = useAppSelector(selectUser);
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const container =
    window !== undefined ? () => window().document.body : undefined;


  return (
    <Drawer
      container={container}
      variant="temporary"
      open={open && isSmallScreen}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      <Box onClick={toggleDrawer}>
        <Typography variant="h6" sx={{ mx: 2, my: 2 }}>
          TechGear Logistics
        </Typography>
        <Divider />
        <List>
          {user ? (
            user.role === 'client' ? (
              <UserNavigation />
            ) : (
              <AdminNavigation />
            )
          ) : null}
          {!user && (
            <Stack direction="column" px={2} spacing={2} my={2}>
              <Button
                fullWidth
                component="a"
                href={appRoutes.register}
                variant="contained"
              >
                Регистрация
              </Button>
              <Button
                fullWidth
                component="a"
                href={appRoutes.login}
                variant="contained"
              >
                Войти
              </Button>
            </Stack>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;

