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

import { login } from './usersThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectLoginError,
  selectLoginLoading,
  setLoginError,
} from './usersSlice';
import { LoginMutation } from '../../types/types.User';
import { appRoutes } from '../../utils/constants';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);

  const [state, setState] = useState<LoginMutation>({
    email: '',
    password: '',
  });

  const [showPass, setShowPass] = useState(false);

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
      await dispatch(login(state)).unwrap();
      navigate(appRoutes.profile);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}

        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Почта"
                name="email"
                type="text"
                fullWidth
                autoComplete="current-email"
                value={state.email}
                onChange={inputChangeHandler}
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
    </Container>
  );
};

export default Login;
