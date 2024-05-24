import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';

import { regionsState } from '../../regions/regionsSlice';
import { fetchRegions } from '../../regions/regionsThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ProfileMutation } from '../../../types/types.Profile';
import { selectPups } from '../../pups/pupsSlice';
import { fetchPups } from '../../pups/pupsThunks';
import { update } from '../usersThunks';
import { regEx } from '../../../utils/constants';
import { selectRegisterError } from '../usersSlice';

interface Props {
  state: ProfileMutation;
  open: boolean;
  handleClose: () => void;
  inputChangeHandler: React.ChangeEventHandler<HTMLInputElement>;
}

const UserDialog: React.FC<Props> = ({
  state,
  open,
  handleClose,
  inputChangeHandler,
}) => {
  const regions = useAppSelector(regionsState);
  const pups = useAppSelector(selectPups);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);

  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const fetchPupsByRegion = useCallback(async (region: string) => {
    await dispatch(fetchPups(region));
  }, [dispatch]);

  useEffect(() => {
    if (state.region) {
      void fetchPupsByRegion(state.region);
    }
  }, [fetchPupsByRegion, state.region]);


  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const newFieldErrors: { [key: string]: string } = {};
    if (!state.firstName) newFieldErrors.firstName = 'Имя обязательно';
    if (!state.lastName) newFieldErrors.lastName = 'Фамилия обязательна';
    if (!state.email) {
      newFieldErrors.email = 'Электронная почта обязательна';
      setEmailIsValid(false);
    } else if (!regEx.test(state.email)) {
      newFieldErrors.email = 'Неверный формат электронной почты';
      setEmailIsValid(false);
    }
    if (!state.region) newFieldErrors.region = 'Регион обязателен';
    if (!state.pupID) newFieldErrors.pupID = 'ПВЗ обязателен';

    setFieldErrors(newFieldErrors);

    if (Object.keys(newFieldErrors).length > 0) return;

    try {
      await dispatch(update(state));
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Редактирование профиля</DialogTitle>
        <DialogContent sx={{ mt: '20px' }}>
          <form autoComplete="off">
            <Button
              sx={{
                '&.MuiButton-root:hover': { background: '#D2122E' },
                color: 'white',
                background: '#9e1b32',
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              onClick={handleClose}
            >
              X
            </Button>
            <Grid container direction="column" spacing={2}>
              <Grid item xs={12} container gap={'10px'} sx={{ mt: 1 }}>
                <TextField
                  required
                  id="firstName"
                  label="Имя"
                  value={state.firstName}
                  onChange={inputChangeHandler}
                  name="firstName"
                  error={Boolean(
                    getFieldError('firstName') || fieldErrors.firstName,
                  )}
                  helperText={
                    getFieldError('firstName') || fieldErrors.firstName
                  }
                />
                <TextField
                  required
                  id="lastName"
                  label="Фамилия"
                  value={state.lastName}
                  onChange={inputChangeHandler}
                  name="lastName"
                  error={Boolean(
                    getFieldError('lastName') || fieldErrors.lastName,
                  )}
                  helperText={getFieldError('lastName') || fieldErrors.lastName}
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
                  required
                  fullWidth
                  id="email"
                  label="Адрес электронной почты"
                  value={state.email}
                  onChange={inputChangeHandler}
                  error={Boolean(
                    getFieldError('email') ||
                      !emailIsValid ||
                      fieldErrors.email,
                  )}
                  helperText={
                    getFieldError('email')
                      ? getFieldError('email')
                      : fieldErrors.email
                  }
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  select
                  name="region"
                  label="Регион"
                  type="text"
                  value={state.region}
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('region') || fieldErrors.region)}
                  helperText={getFieldError('region') || fieldErrors.region}
                >
                  <MenuItem value="" disabled>
                    Выберите регион
                  </MenuItem>
                  {regions.length > 0 &&
                    regions.map((region) => (
                      <MenuItem
                        key={region._id}
                        value={region._id}
                        onClick={() => fetchPupsByRegion(region._id)}
                      >
                        {region.name}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  required
                  name="pupID"
                  label="ПВЗ"
                  type="text"
                  value={pups.length > 0 ? state.pupID : ''}
                  autoComplete="new-pupID"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('pupID') || fieldErrors.pupID)}
                  helperText={getFieldError('pupID') || fieldErrors.pupID}
                >
                  {pups.map((pup) => (
                    <MenuItem key={pup._id} value={pup._id}>
                      {`${pup.name} ${pup.region.name} обл., ${pup.address}, ${pup.settlement}`}
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
                  onClick={handleUpdateProfile}
                >
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
