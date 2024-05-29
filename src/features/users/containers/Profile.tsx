import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';

import UserDialog from '../components/UserDialog';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IUser } from '../../../types/types.User';
import { getOneUser, update } from '../usersThunks';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const isAdmin = user?.role === 'super' || user?.role === 'admin';
  const handleClickOpen = async () => {
    if (user !== null) {
      await dispatch(getOneUser(user._id)).unwrap();
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFormSubmit = async (userMutation: IUser) => {
    dispatch(update(userMutation));
  };

  return (
    <>
      <Grid container spacing={2} flexWrap="nowrap">
        <Grid container direction="column" item>
          <Grid item flexGrow={1}>
            <Typography
              gutterBottom
              variant="h6"
              component="h1"
              fontWeight="bold"
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            {isAdmin ? (
              <></>
            ) : (
              <>
                <Typography variant="subtitle1">
                  Ваш персональный код: {user?.marketId}
                </Typography>
                <Typography variant="subtitle1">
                  Ваш адрес: {user?.region.name} область, {user?.settlement}{' '}
                  {user?.address}
                </Typography>
                {!user?.pupID ? (
                  <Typography
                    color={'red'}
                    sx={{ fontWeight: 600 }}
                    variant="subtitle1"
                  >
                    Нет ПВЗ
                  </Typography>
                ) : (
                  <Typography variant="subtitle1">
                    Ваш {user?.pupID.name} находится по адресу:{' '}
                    {user?.pupID.address}
                  </Typography>
                )}
              </>
            )}
          </Grid>
          <Grid item>
            <Button
              startIcon={<BorderColorIcon />}
              onClick={handleClickOpen}
              color="secondary"
              sx={{ textTransform: 'none' }}
            >
              Редактировать профиль
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <UserDialog onSubmit={onFormSubmit} open={open} onClose={handleClose} />
    </>
  );
};

export default Profile;
