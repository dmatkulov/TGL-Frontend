import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import InputAdornment from '@mui/material/InputAdornment';
import { regEx } from '../../utils/constants';
import { checkForBadWords } from '../../utils/BadWordCheck';

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
  const [showPass, setShowPass] = useState(false);
  const [passLabel, setPassLabel] = useState<string>(
    'Длина пароля должна быть не менее 8 символов',
  );
  const [passIsValid, setPassIsValid] = useState<boolean | undefined>(
    undefined,
  );
  const [phoneNumberLabel, setPhoneNumberLabel] = useState<string>('');
  // const [phoneNumberIsValid, setPhoneNumberIsValid] = useState<boolean>(false);

  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [emailLabel, setEmailLabel] = useState<string>('');

  const [validateFirstNameBadWord, setFirstNameBadWord] = useState<string>('');
  const [validateLasNameBadWord, setLasNameBadWord] = useState<string>('');
  const [validateMiddleNameBadWord, setMiddleNameBadWord] = useState<string>('');
  const [lastNameValid, setLastNameValid] = useState<boolean | undefined>(undefined);
  const [firstNameValid, setFirstNameValid] = useState<boolean | undefined>(undefined);
  const [middleNameValid, setMiddleNameValid] = useState<boolean | undefined>(undefined);

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
      if (name === 'password' && value.length >= 8) {
        setPassIsValid(true);
        setPassLabel('Надежный пароль');
      }

      const isBadWord = checkForBadWords(name, value);

      if (name === 'lastName') {
        setLastNameValid(!isBadWord);
        setLasNameBadWord(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
      }
      if (name === 'firstName') {
        setFirstNameValid(!isBadWord);
        setFirstNameBadWord(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
      }
      if (name === 'middleName') {
        setMiddleNameValid(!isBadWord);
        setMiddleNameBadWord(isBadWord ? 'В ваших данных присутствует не нормативная лексика!' : '');
      }

      return { ...prevState, [name]: value };
    });
  };

  const isFormValid = () => {
    return (
      state.email &&
      state.password &&
      state.pupID &&
      state.firstName &&
      state.lastName &&
      state.phoneNumber &&
      state.region
    );
  };

  const handleClickShowPassword = () => setShowPass((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handlePhoneChange = (value: string) => {
    setState((prevState) => {
      if (value.length < 12) {
        // setPhoneNumberIsValid(true);
        setPhoneNumberLabel('Номер должен быть введен полностью');
      } else if (value.length > 11) {
        // setPhoneNumberIsValid(true);
        setPhoneNumberLabel('');
      }
      return { ...prevState, phoneNumber: value };
    });
  };

  useEffect(() => {
    dispatch(setRegisterError(null));
    dispatch(fetchRegions());
  }, [dispatch]);

  const fetchPupsByRegion = async (region: string) => {
    await dispatch(fetchPups(region));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (state.password.length >= 1 && state.password.length < 8) {
        setPassLabel('Пароль слишком короткий');
        setPassIsValid(false);
        return;
      }

      if (state.phoneNumber.length < 12) {
        setPhoneNumberLabel('Пропишите номер полностью');
        // setPhoneNumberIsValid(false);
        return;
      }

      if (regEx.test(state.email)) {
        setEmailIsValid(true);
      } else if (!regEx.test(state.email) && state.email !== '') {
        setEmailLabel('Неверный формат электронной почты');
        setEmailIsValid(false);
        return;
      }

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
                required
                name="lastName"
                label="Фамилия"
                type="text"
                value={state.lastName}
                autoComplete="new-lastName"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('lastName') || lastNameValid === false)}
                helperText={getFieldError('lastName') ? getFieldError('lastName') : validateLasNameBadWord}
                sx={{
                  input: {
                    color:
                      state.lastName.length > 1 ? 'primary.main' : 'inherit',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="firstName"
                label="Имя"
                type="text"
                value={state.firstName}
                autoComplete="new-firstName"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('firstName') || firstNameValid === false)}
                helperText={getFieldError('firstName') ? getFieldError('firstName') : validateFirstNameBadWord}
                sx={{
                  input: {
                    color:
                      state.firstName.length > 1 ? 'primary.main' : 'inherit',
                  },
                }}
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
                error={Boolean(getFieldError('middleName') || middleNameValid === false)}
                helperText={getFieldError('middleName') ? getFieldError('firstName') : validateMiddleNameBadWord}
                sx={{
                  input: {
                    color:
                      state.middleName.length > 1 ? 'primary.main' : 'inherit',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="password"
                label="Пароль"
                type={showPass ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={state.password}
                autoComplete="new-password"
                onChange={inputChangeHandler}
                error={Boolean(
                  getFieldError('password') || passIsValid === false,
                )}
                helperText={
                  getFieldError('password')
                    ? getFieldError('password')
                    : passLabel
                }
                sx={{
                  '.MuiFormHelperText-root': {
                    color: passIsValid ? 'primary.main' : 'inherit',
                  },
                }}
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
              {getFieldError('phoneNumber') ? (
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
              ) : (
                <Typography
                  sx={{
                    fontSize: '12px',
                    ml: '14px',
                    mt: '4px',
                    color: '#d32f2f',
                  }}
                >
                  {phoneNumberLabel}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="email"
                value={state.email}
                placeholder="email@email.com"
                autoComplete="new-email"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('email') || !emailIsValid)}
                helperText={
                  getFieldError('email') ? getFieldError('email') : emailLabel
                }
                sx={{
                  '.MuiFormHelperText-root': {
                    color: emailIsValid ? 'inherit' : '#d32f2f',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
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
                  Выберите область
                </MenuItem>
                {regions.map((region) => (
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
                name="settlement"
                label="Населенный пункт"
                type="text"
                value={state.settlement}
                autoComplete="new-settlement"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('settlement'))}
                helperText={getFieldError('settlement')}
                sx={{
                  input: {
                    color:
                      state.settlement.length > 1 ? 'primary.main' : 'inherit',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="address"
                label="Адрес"
                type="text"
                value={state.address}
                autoComplete="new-address"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('address'))}
                helperText={getFieldError('address')}
                sx={{
                  input: {
                    color:
                      state.address.length > 1 ? 'primary.main' : 'inherit',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="pupID"
                label="ПВЗ"
                type="text"
                value={state.pupID}
                autoComplete="new-pupID"
                onChange={inputChangeHandler}
                error={Boolean(getFieldError('pupID'))}
                helperText={getFieldError('pupID')}
              >
                {pups.length > 0 && (
                  <MenuItem value="" disabled>
                    Выберите ближайший ПВЗ
                  </MenuItem>
                )}
                {pups.length > 0 ? (
                  pups.map((pup) => (
                    <MenuItem key={pup._id} value={pup._id}>
                      <b style={{ marginRight: '10px' }}>{pup.name}</b>
                      {pup.region.name} обл., {pup.address}, {pup.settlement}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="" disabled>
                    Сначала выберите регион
                  </MenuItem>
                )}
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
                  disabled={!isFormValid() || loading}
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
