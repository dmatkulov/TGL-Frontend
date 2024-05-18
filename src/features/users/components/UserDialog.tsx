import React, { useEffect } from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';

import { regionsState } from '../../regions/regionsSlice';
import { fetchRegions } from '../../regions/regionsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProfileMutation } from '../../../types/types.Profile';

interface Props {
  state: ProfileMutation;
  open: boolean;
  handleClose: () => void;
  handleUpdateProfile: React.FormEventHandler;
  inputChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const UserDialog: React.FC<Props> = ({
  state,
  open,
  handleClose,
  handleUpdateProfile,
  inputChangeHandler,
}) => {
  const regions = useAppSelector(regionsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Редактирование профиля</DialogTitle>
        <DialogContent
          sx={{mt: '20px'}}
        >
          <form autoComplete="off">
            <Button
              sx={{'&.MuiButton-root:hover': { background: '#D2122E' },
                color: 'white',
                background: '#9e1b32',
                position: 'absolute',
                top: 0,
                right: 0}}
              onClick={handleClose}>X</Button>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} container gap={'10px'} sx={{ mt: 1 }}>
                <TextField
                  id="firstName"
                  label="Имя"
                  value={state.firstName}
                  onChange={inputChangeHandler}
                  name="firstName"
                />
                <TextField
                  id="lastName"
                  label="Фамилия"
                  value={state.lastName}
                  onChange={inputChangeHandler}
                  name="lastName"
                />
                <TextField
                  id="middleName"
                  label="Отчество"
                  value={state.middleName}
                  onChange={inputChangeHandler}
                  name="middleName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Адрес электронной почты"
                  value={state.email}
                  onChange={inputChangeHandler}
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  name="region"
                  label="Регион"
                  type="text"
                  value={state.region}
                  onChange={inputChangeHandler}
                >
                  <MenuItem value="" disabled>
                    Выберите регион
                  </MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region._id} value={region._id}>
                      {region.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="settlement"
                  label="Населенный пункт"
                  value={state.settlement}
                  onChange={inputChangeHandler}
                  name="settlement"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="address"
                  label="Адрес"
                  value={state.address}
                  onChange={inputChangeHandler}
                  name="address"
                />
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={handleUpdateProfile}>
                  Редактировать данные
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserDialog;
