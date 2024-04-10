import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { appRoutes } from '../../../utils/constants';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  toggleDrawer: React.MouseEventHandler;
  window?: () => Window;
}

const drawerWidth = 320;
const DrawerMenu: React.FC<Props> = ({ open, toggleDrawer, window }) => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerContent = (
    <Box onClick={toggleDrawer}>
      <Typography variant="h6" sx={{ mx: 2, my: 2 }}>
        TechGear Logistics
      </Typography>
      <Divider />
      <List>
        {user ? (
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(appRoutes.profile)}>
              <ListItemText primary="Профиль" />
            </ListItemButton>
          </ListItem>
        ) : (
          <Stack direction="column" px={2} spacing={2} my={2}>
            <Button
              fullWidth
              component={NavLink}
              to={appRoutes.register}
              variant="contained"
            >
              Регистрация
            </Button>
            <Button
              fullWidth
              component={NavLink}
              to={appRoutes.login}
              variant="contained"
            >
              Войти
            </Button>
          </Stack>
        )}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Контакты" />
          </ListItemButton>
        </ListItem>
        {user && (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Выйти" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </nav>
    </>
  );
};

export default DrawerMenu;
