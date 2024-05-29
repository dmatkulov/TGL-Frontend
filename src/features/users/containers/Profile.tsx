import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';

import Warehouses from '../../warehouses/Warehouses';
import UserDialog from '../components/UserDialog';
import { ProfileMutation } from '../../../types/types.Profile';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Profile = () => {
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);

  const [state, setState] = useState<ProfileMutation>({
    email: user?.email,
    firstName: user?.firstName,
    lastName: user?.lastName,
    middleName: user?.middleName,
    region: user?.region?._id,
    settlement: user?.settlement,
    address: user?.address,
    pupID: user?.pupID ? user?.pupID._id : null,
  });

  const isAdmin = user?.role === 'super' || user?.role === 'admin';
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
        {isAdmin ? (
          <></>
        ) : (
          <Grid item>
            <Warehouses />
          </Grid>
        )}
      </Grid>
      <UserDialog
        state={state}
        open={open}
        handleClose={handleClose}
        inputChangeHandler={inputChangeHandler}
      />
    </>
  );
};

export default Profile;
