import { Button, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import { ProfileMutation } from '../../../types/types.Profile';
import Warehouses from '../../warehouses/Warehouses';
import { update } from '../usersThunks';
import UserDialog from '../components/UserDialog';

const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ProfileMutation>({
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    middleName: user?.middleName || '',
    region: user?.region._id || '',
    settlement: user?.settlement || '',
    address: user?.address || '',
  });
  const isAdmin = user?.role === 'super' || 'admin';

  console.log(user)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(update(state));

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
          <Grid item>
            <Typography variant="h2">
              {user?.firstName} {user?.lastName}
            </Typography>
            {isAdmin ? (
              <></>
            ) : (
              <Typography variant="h4">
                Ваш персональный код: {user?.marketId}
              </Typography>
            )}
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleClickOpen}>
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
        handleUpdateProfile={handleUpdateProfile}
        inputChangeHandler={inputChangeHandler}
      />
    </>
  );
};

export default Profile;
