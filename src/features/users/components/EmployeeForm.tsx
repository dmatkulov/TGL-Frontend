import React, { useEffect, useState } from 'react';

import { regEx } from '../../../utils/constants';
import {
  Box,
  Container,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { EmployeeType } from '../../../types/types.Employee';
import { regionsState } from '../../regions/regionsSlice';
import { fetchRegions } from '../../regions/regionsThunks';

const EmployeeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const regions = useAppSelector(regionsState);

  const [employee, setEmployee] = useState<EmployeeType>({
    firstName: '',
    lastName: '',
    middleName: '',
    password: '',
    email: '',
    phoneNumber: '',
    region: '',
  });

  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [emailLabel, setEmailLabel] = useState<string>('');
  const [showPass, setShowPass] = useState(false);
  const [passLabel, setPassLabel] = useState<string>(
    'Длина пароля должна быть не менее 8 символов',
  );

  const [passIsValid, setPassIsValid] = useState<boolean | undefined>(
    undefined,
  );

  const [phoneNumberLabel, setPhoneNumberLabel] = useState<string>('');

  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployee((prevState) => {
      if (name === 'password' && value.length >= 8) {
        setPassIsValid(true);
        setPassLabel('Надежный пароль');
      }

      return { ...prevState, [name]: value };
    });
  };

  const handlePhoneChange = (value: string) => {
    setEmployee((prevState) => {
      if (value.length < 12) {
        setPhoneNumberLabel('Номер должен быть введен полностью');
      } else if (value.length > 11) {
        setPhoneNumberLabel('');
      }
      return { ...prevState, phoneNumber: value };
    });
  };

  const handleClickShowPassword = () => setShowPass((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (employee.phoneNumber.length < 12) {
        setPhoneNumberLabel('Пропишите номер полностью');
        return;
      }

      if (regEx.test(employee.email)) {
        setEmailIsValid(true);
      } else if (!regEx.test(employee.email) && employee.email !== '') {
        setEmailLabel('Неверный формат электронной почты');
        setEmailIsValid(false);
        return;
      }

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" disableGutters>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography gutterBottom component="h1" variant="h5" mb={3}>
          Форма создания сотрудника
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={submitFormHandler}
          sx={{ mt: 0, width: '100%' }}
        >
          <Grid container spacing={2} alignItems="start">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="firstName"
                label="Имя"
                type="text"
                value={employee.firstName}
                autoComplete="new-firstName"
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="lastName"
                label="Фамилия"
                type="text"
                value={employee.lastName}
                autoComplete="new-lastName"
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="middleName"
                label="Отчество"
                type="text"
                value={employee.middleName}
                autoComplete="new-middleName"
                onChange={inputChangeHandler}
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
                value={employee.password}
                autoComplete="new-password"
                error={passIsValid === false}
                helperText={passLabel}
                onChange={inputChangeHandler}
                sx={{
                  '.MuiFormHelperText-root': {
                    color: passIsValid ? 'primary.main' : 'inherit',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                label="Email"
                name="email"
                type="text"
                value={employee.email}
                autoComplete="new-email"
                error={emailIsValid}
                helperText={emailLabel}
                onChange={inputChangeHandler}
                sx={{
                  '.MuiFormHelperText-root': {
                    color: emailIsValid ? 'inherit' : '#d32f2f',
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
                value={employee.phoneNumber}
                onChange={handlePhoneChange}
                specialLabel="Номер телефона*"
                disableDropdown
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
              />
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                required
                name="region"
                label="Регион"
                type="text"
                value={regions.length > 0 ? employee.region : ''}
                autoComplete="new-region"
                onChange={inputChangeHandler}
              >
                <MenuItem value="" disabled>
                  Выберите область
                </MenuItem>
                {regions.length > 0 &&
                  regions.map((region) => (
                    <MenuItem
                      key={region._id}
                      value={region._id}>
                      {region.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid
              container
              item
              direction="column"
              justifyContent="center"
              lg={12}>
              <Grid item>
                <Typography variant="body2" fontSize="small">
                  * Обязательно для заполнения
                </Typography>
              </Grid>
              <Grid item textAlign="center">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1 }}>
                  Создать сотрудника
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeForm;
