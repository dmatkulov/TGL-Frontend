import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import {
  selectRegisterError,
  selectRegisterLoading,
  setRegisterError,
} from './usersSlice';
import { register } from './usersThunks';
import { appRoutes } from '../../utils/constants';
import { selectPups } from '../pups/pupsSlice';
import { fetchPups } from '../pups/pupsThunks';
import { regionsState } from '../regions/regionsSlice';
import { fetchRegions } from '../regions/regionsThunks';
import { RegisterMutation } from '../../types/types.User';

const initialState: RegisterMutation = {
  email: '',
  password: '',
  pupID: '',
  firstName: '',
  lastName: '',
  middleName: '',
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
  const pups = useAppSelector(selectPups);
  const regions = useAppSelector(regionsState);

  const [state, setState] = useState<RegisterMutation>(initialState);

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
    dispatch(fetchPups());
    dispatch(fetchRegions());
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                // required
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                // required
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="middleName"
                label="Отчество"
                type="text"
                value={state.middleName}
                autoComplete="new-middleName"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('middleName'))}
                helperText={getFieldError('middleName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                // required
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
            <Grid item xs={12} sm={6}>
              <PhoneInput
                country="kg"
                masks={{ kg: '(...) ..-..-..' }}
                onlyCountries={['kg']}
                containerStyle={{ width: '100%' }}
                value={state.phoneNumber}
                countryCodeEditable={false}
                onChange={handlePhoneChange}
                specialLabel="Номер телефона*"
                disableDropdown
                inputStyle={{
                  width: '100%',
                  borderColor: getFieldError('phoneNumber') && '#d32f2f',
                  color: getFieldError('phoneNumber') && '#d32f2f',
                }}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
              />
              {getFieldError('phoneNumber') && (
                <Typography
                  sx={{
                    fontSize: '12px',
                    ml: '14px',
                    mt: '4px',
                    color: '#d32f2f',
                  }}
                >
                  {getFieldError('phoneNumber')}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                // required
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

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                // required
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
                  Выберите область
                </MenuItem>
                {regions.map((region) => (
                  <MenuItem key={region._id} value={region._id}>
                    {region.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                // required
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                // required
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
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                // required
                name="pupID"
                label="ПВЗ"
                type="text"
                value={state.pupID}
                autoComplete="new-pupID"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('pupID'))}
                helperText={getFieldError('pupID')}
              >
                <MenuItem value="" disabled>
                  Выберите ближайший ПВЗ
                </MenuItem>
                {pups.map((pup) => (
                  <MenuItem key={pup._id} value={pup._id}>
                    <b>{pup.name}</b>
                    {pup.region.name} обл., {pup.address}, {pup.settlement}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              lg={12}
            >
              <Grid item>
                <Typography variant="body2" fontSize="small">
                  * Обязательно для заполнения
                </Typography>
              </Grid>
              <Grid item textAlign="center">
                <LoadingButton
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
              <Grid item textAlign="center">
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
