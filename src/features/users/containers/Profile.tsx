import {Button, Grid, Typography} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import { ProfileMutation } from '../../../types/types.Profile';
import Warehouses from '../../warehouses/Warehouses';
import { update } from '../usersThunks';
import UserDialog from '../components/UserDialog';
import BorderColorIcon from '@mui/icons-material/BorderColor';
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
  const isAdmin = user?.role === 'super' || user?.role === 'admin';
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
          <Grid item flexGrow={1}>
            <Typography
              gutterBottom
              variant="h6"
              component="h1"
              fontWeight="bold"
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            { isAdmin ? (
              <></>
            ) : (
              <Typography variant="subtitle1">
                Ваш персональный код: {user?.marketId}
              </Typography>
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
        { isAdmin ? (
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
