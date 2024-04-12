import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Checkbox,
  Container,
  Grid,
  Link,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectRegisterError,
  selectRegisterLoading,
  setRegisterError,
} from './usersSlice';
import { register } from './usersThunks';

import { RegisterMutation } from '../../types/types';
import { appRoutes, regions } from '../../utils/constants';
import OrdersTable from '../orders/components/OrdersTable';

const initialState: RegisterMutation = {
  email: '',
  firstName: '',
  lastName: '',
  middleName: '',
  password: '',
  phoneNumber: '',
  region: '',
  settlement: '',
  address: '',
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);

  const loading = useAppSelector(selectRegisterLoading);

  const [state, setState] = useState<RegisterMutation>(initialState);

  const [checked, setChecked] = useState(false);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      setState((prevState) => ({ ...prevState, middleName: '' }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handlePhoneChange = (value: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  useEffect(() => {
    dispatch(setRegisterError(null));
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(register(state)).unwrap();
      navigate(appRoutes.profile);
      setState(initialState);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main">
      <OrdersTable />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <Box
          component="form"
          onSubmit={submitFormHandler}
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid container spacing={2} alignItems="start">
            <Grid container item xs={12} sm={6} direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="lastName"
                  label="Фамилия"
                  type="text"
                  value={state.lastName}
                  autoComplete="new-lastName"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('lastName'))}
                  helperText={getFieldError('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="firstName"
                  label="Имя"
                  type="text"
                  value={state.firstName}
                  autoComplete="new-firstName"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('firstName'))}
                  helperText={getFieldError('firstName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="middleName"
                  label="Отчество"
                  type="text"
                  value={state.middleName}
                  autoComplete="new-middleName"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('middleName'))}
                  helperText={getFieldError('middleName')}
                  disabled={checked}
                />
                <Stack direction="row" alignItems="center" mt={1}>
                  <Checkbox
                    size="small"
                    checked={checked}
                    onChange={handleChecked}
                  />
                  <Typography variant="body2" fontSize="small">
                    У меня нет отчества
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Grid container item xs={12} sm={6} direction="row" spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Email"
                  name="email"
                  type="text"
                  value={state.email}
                  autoComplete="new-email"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('email'))}
                  helperText={getFieldError('email')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Пароль"
                  type="password"
                  value={state.password}
                  autoComplete="new-password"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('password'))}
                  helperText={getFieldError('password')}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  country="kg"
                  onlyCountries={['kg']}
                  containerStyle={{ width: '100%' }}
                  value={state.phoneNumber}
                  onChange={handlePhoneChange}
                  defaultErrorMessage={getFieldError('phoneNumber')}
                  specialLabel="Номер телефона"
                  disableDropdown
                  inputStyle={{ width: '100%' }}
                  inputProps={{
                    name: 'phoneNumber',
                    required: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  required
                  name="region"
                  label="Регион"
                  type="text"
                  value={state.region}
                  autoComplete="new-region"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('region'))}
                  helperText={getFieldError('region')}
                >
                  <MenuItem value="" disabled>
                    Выберите регион
                  </MenuItem>
                  {regions.map((region) => (
                    <MenuItem key={region.id} value={region.name}>
                      {region.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="settlement"
                  label="Населенный пункт"
                  type="text"
                  value={state.settlement}
                  autoComplete="new-settlement"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('settlement'))}
                  helperText={getFieldError('settlement')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="address"
                  label="Адрес"
                  type="text"
                  value={state.address}
                  autoComplete="new-address"
                  onChange={inputChangeHandler}
                  error={Boolean(getFieldError('address'))}
                  helperText={getFieldError('address')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" fontSize="small">
                  * Обязательно для заполнения
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1 }}
                  disableElevation
                  disabled={loading}
                  loading={loading}
                >
                  Зарегистрироваться
                </LoadingButton>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Link
                  component={RouterLink}
                  to={appRoutes.login}
                  variant="body2"
                >
                  Уже зарегистрированы? Войти
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default Register;
