import React, { useState } from 'react';
import {
  Avatar,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { User } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logOut } from '../../../features/users/usersThunks';
import { selectLogOutLoading } from '../../../features/users/usersSlice';
import { appRoutes } from '../../../utils/constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLogOutLoading);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleLogOut = async () => {
    await dispatch(logOut()).unwrap();
    navigate(appRoutes.home);
  };

  return (
    <>
      {loading && <CircularProgress />}
      <Stack direction="row" alignItems="center">
        <Typography color="text.primary">
          {user.firstName} {user.lastName}
        </Typography>
        <IconButton
          onMouseOver={handleClick}
          sx={{ display: 'flex', gap: 1 }}
          disableRipple
        >
          <Avatar alt={user.firstName} sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Stack>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        sx={{ mt: 2 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => navigate(appRoutes.profile)}>Профиль</MenuItem>
        <MenuItem onClick={handleLogOut}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
