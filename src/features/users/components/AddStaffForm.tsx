import React, { useEffect, useState } from 'react';
import {
  selectRegisterError,
  selectRegisterLoading,
  setRegisterError,
} from '../usersSlice';
import { fetchPups } from '../../pups/pupsThunks';
import { fetchRegions } from '../../regions/regionsThunks';
import { appRoutes, Roles } from '../../../utils/constants';
import {
  Box,
  Container,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectPups } from '../../pups/pupsSlice';
import { regionsState } from '../../regions/regionsSlice';
import { IStaff } from '../../../types/types.User';
import { getStaffData } from '../usersThunks';

interface AddStaffFormProps {
  onSubmit: (data: IStaff) => void;
  isEdit?: boolean;
  existingStaff?: IStaff;
}

const initialState: IStaff = {
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
  role: '',
};

const AddStaffForm: React.FC<AddStaffFormProps> = ({
  onSubmit,
  isEdit = false,
  existingStaff = initialState,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const pups = useAppSelector(selectPups);
  const regions = useAppSelector(regionsState);
  const roles = Roles;

  const [formData, setFormData] = useState<IStaff>(existingStaff);

  const getError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  useEffect(() => {
    dispatch(setRegisterError(null));
    dispatch(fetchRegions());
    dispatch(fetchPups());
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      onSubmit(formData);
      dispatch(getStaffData());
      navigate(appRoutes.staff);
      setFormData(initialState);
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
          {isEdit ? 'Обновление Сотрудника' : 'Регистрация Сотрудника'}
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={submitFormHandler}
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid container spacing={2} alignItems="start">
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="firstName"
                label="Имя"
                type="text"
                value={formData.firstName}
                autoComplete="new-firstName"
                onChange={inputChangeHandler}
                error={Boolean(getError('firstName'))}
                helperText={getError('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="lastName"
                label="Фамилия"
                type="text"
                value={formData.lastName}
                autoComplete="new-lastName"
                onChange={inputChangeHandler}
                error={Boolean(getError('lastName'))}
                helperText={getError('lastName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="middleName"
                label="Отчество"
                type="text"
                value={formData.middleName}
                autoComplete="new-middleName"
                onChange={inputChangeHandler}
                error={Boolean(getError('middleName'))}
                helperText={getError('middleName')}
              />
            </Grid>
            {isEdit ? (
              <></>
            ) : (
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="password"
                  label="Пароль"
                  type="password"
                  value={formData.password}
                  autoComplete="new-password"
                  onChange={inputChangeHandler}
                  error={Boolean(getError('password'))}
                  helperText={getError('password')}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <PhoneInput
                country="kg"
                masks={{ kg: '(...) ..-..-..' }}
                onlyCountries={['kg']}
                containerStyle={{ width: '100%' }}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                defaultErrorMessage={getError('phoneNumber')}
                specialLabel="Номер телефона*"
                disableDropdown
                inputStyle={{ width: '100%' }}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
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
                value={formData.email}
                autoComplete="new-email"
                onChange={inputChangeHandler}
                error={Boolean(getError('email'))}
                helperText={getError('email')}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                required
                name="role"
                label="Роль"
                type="text"
                value={roles.length > 0 ? formData.role : ''}
                autoComplete="new-role"
                onChange={inputChangeHandler}
                error={Boolean(getError('role'))}
                helperText={getError('role')}
              >
                <MenuItem value="" disabled>
                  Роль сотрудника
                </MenuItem>
                {roles.length > 0 &&
                  roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                required
                name="region"
                label="Регион"
                type="text"
                value={regions.length > 0 ? formData.region : ''}
                autoComplete="new-region"
                onChange={inputChangeHandler}
                error={Boolean(getError('region'))}
                helperText={getError('region')}
              >
                <MenuItem value="" disabled>
                  Выберите область
                </MenuItem>
                {regions.length > 0 &&
                  regions.map((region) => (
                    <MenuItem key={region._id} value={region._id}>
                      {region.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="settlement"
                label="Населенный пункт"
                type="text"
                value={formData.settlement}
                autoComplete="new-settlement"
                onChange={inputChangeHandler}
                error={Boolean(getError('settlement'))}
                helperText={getError('settlement')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                name="address"
                label="Адрес"
                type="text"
                value={formData.address}
                autoComplete="new-address"
                onChange={inputChangeHandler}
                error={Boolean(getError('address'))}
                helperText={getError('address')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                required
                name="pupID"
                label="ПВЗ"
                type="text"
                value={pups.length > 0 ? formData.pupID : ''}
                autoComplete="new-pupID"
                onChange={inputChangeHandler}
                error={Boolean(getError('pupID'))}
                helperText={getError('pupID')}
              >
                <MenuItem value="" disabled>
                  Выберите ближайший ПВЗ
                </MenuItem>
                {pups.length > 0 &&
                  pups.map((pup) => (
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
                  {isEdit ? 'Обновить' : 'Зарегестрировать'}
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

export default AddStaffForm;
