import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { regEx } from '../../utils/constants';

import { login, loginByLastSession } from './usersThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectLastUser,
  selectLoginError,
  selectLoginLoading,
  setLoginError,
} from './usersSlice';
import {
  LoginLastSessionMutation,
  LoginMutation,
} from '../../types/types.User';
import { appRoutes } from '../../utils/constants';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const lastUser = useAppSelector(selectLastUser);

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [emailLabel, setEmailLabel] = useState<string>('');

  const handleClickShowPassword = () => setShowPass((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    dispatch(setLoginError(null));
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (regEx.test(state.email)) {
        setEmailIsValid(true);
      } else if (!regEx.test(state.email) && state.email !== '') {
        setEmailLabel('Неверный формат электронной почты');
        setEmailIsValid(false);
        return;
      }

      await dispatch(login(state)).unwrap();
      navigate(appRoutes.profile);
    } catch (e) {
      console.error(e);
    }
  };

  const submitLastLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (lastUser) {
        const tokenObj: LoginLastSessionMutation = {
          token: lastUser.token,
        };
        await dispatch(loginByLastSession(tokenObj));
        navigate(appRoutes.profile);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Grid container alignItems="center">
        {lastUser ? (
          <Grid item xs={4}>
            <Box
              component="form"
              onSubmit={submitLastLogin}
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '3px solid #5F9EA0',
                borderRadius: '20px',
                padding: '5px',
              }}
            >
              <Typography component="h1" variant="h5">
                Войти как {lastUser?.lastName} {lastUser?.firstName}
              </Typography>
              <Typography component="h1" variant="h6" color={'#808080'}>
                {lastUser?.email}
              </Typography>
              <Typography component="h1" variant="h6" color={'#808080'}>
                {lastUser?.phoneNumber}
              </Typography>
              <LoadingButton
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, py: 1 }}
                disableElevation
                disabled={loading}
                loading={loading}
              >
                Войти
              </LoadingButton>
            </Box>
          </Grid>
        ) : null}

        <Grid item xs={lastUser ? 7 : 12}>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Войти в личный кабинет
            </Typography>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
                  {error.message}
                </Alert>
              </Grid>
            )}

            <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={state.email}
                    placeholder="email@email.com"
                    autoComplete="current-email"
                    onChange={inputChangeHandler}
                    error={!emailIsValid}
                    helperText={emailLabel}
                    sx={{
                      '.MuiFormHelperText-root': {
                        color: emailIsValid ? 'inherit' : '#d32f2f',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Пароль"
                    type={showPass ? 'text' : 'password'}
                    fullWidth
                    autoComplete="current-password"
                    value={state.password}
                    onChange={inputChangeHandler}
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
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1 }}
                  disableElevation
                  disabled={loading}
                  loading={loading}
                >
                  Войти
                </LoadingButton>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Link
                  component={RouterLink}
                  to={appRoutes.register}
                  variant="body2"
                >
                  Еще нет аккаунта? Регистрация
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
