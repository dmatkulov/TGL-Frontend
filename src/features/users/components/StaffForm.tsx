import React, {useEffect, useState} from 'react';
import {
  selectRegisterError,
  selectRegisterLoading,
  setRegisterError,
} from '../usersSlice';
import {fetchPups} from '../../pups/pupsThunks';
import {fetchRegions} from '../../regions/regionsThunks';
import {regEx, Roles} from '../../../utils/constants';
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
import {LoadingButton} from '@mui/lab';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectPups} from '../../pups/pupsSlice';
import {regionsState} from '../../regions/regionsSlice';
import {IStaff} from '../../../types/types.User';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

interface AddStaffFormProps {
  onSubmit: (data: IStaff) => void;
  onClose: () => void;
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

const StaffForm: React.FC<AddStaffFormProps> = ({
  onSubmit,
  onClose,
  isEdit = false,
  existingStaff = initialState,
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const pups = useAppSelector(selectPups);
  const regions = useAppSelector(regionsState);
  const roles = Roles;

  const [formData, setFormData] = useState<IStaff>(existingStaff);
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [emailLabel, setEmailLabel] = useState<string>('');
  const [showPass, setShowPass] = useState(false);
  const [passLabel, setPassLabel] = useState<string>(
    'Длина пароля должна быть не менее 8 символов',
  );
  const [passIsValid, setPassIsValid] = useState<boolean | undefined>(
    undefined,
  );
  const [phoneNumberLabel, setPhoneNumberLabel] = useState<string>('',);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState<boolean>(false);
  const getError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.pupID &&
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.region &&
      formData.settlement &&
      formData.address
    );
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevState) => {
      if (name === 'password' && value.length >= 8) {
        setPassIsValid(true);
        setPassLabel('Надежный пароль');
      }

      return {...prevState, [name]: value};
    });
  };

  const handlePhoneChange = (value: string) => {

    setFormData((prevState) => {
      if (value.length < 12) {
        setPhoneNumberIsValid(true);
        setPhoneNumberLabel('Номер должен быть введен полностью');
      } else if (value.length > 11) {
        setPhoneNumberIsValid(true);
        setPhoneNumberLabel('');
      }
      return {...prevState, phoneNumber: value};
    });
  };

  const handleClickShowPassword = () => setShowPass((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
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
      if (!isEdit) {
        if (formData.password.length >= 1 && formData.password.length < 8) {
          setPassLabel('Пароль слишком короткий');
          setPassIsValid(false);
          return;
        }
      }

      if (formData.phoneNumber.length < 12) {
        setPhoneNumberLabel('Пропишите номер полностью');
        setPhoneNumberIsValid(false);
        return;
      }

      if (regEx.test(formData.email)) {
        setEmailIsValid(true);
      } else if (!regEx.test(formData.email) && formData.email !== '') {
        setEmailLabel('Неверный формат электронной почты');
        setEmailIsValid(false);
        return;
      }
      onSubmit(formData);
      setFormData(initialState);
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
        <IconButton
          sx={{position: 'absolute', top: 5, right: 5}}
          onClick={onClose}
        >
          <CloseIcon/>
        </IconButton>
        <Typography gutterBottom component="h1" variant="h5" mb={3}>
          {isEdit ? 'Обновление Сотрудника' : 'Регистрация Сотрудника'}
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={submitFormHandler}
          sx={{mt: 0, width: '100%'}}
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
                  type={showPass ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPass ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  value={formData.password}
                  autoComplete="new-password"
                  onChange={inputChangeHandler}
                  error={Boolean(getError('password') || passIsValid === false)}
                  helperText={
                    getError('password') ? getError('password') : passLabel
                  }
                  sx={{
                    '.MuiFormHelperText-root': {
                      color: passIsValid ? 'primary.main' : 'inherit',
                    },
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <PhoneInput
                country="kg"
                masks={{kg: '(...) ..-..-..'}}
                onlyCountries={['kg']}
                containerStyle={{width: '100%'}}
                value={formData.phoneNumber}
                onChange={handlePhoneChange}
                defaultErrorMessage={getError('phoneNumber')}
                specialLabel="Номер телефона*"
                disableDropdown
                inputStyle={{
                  width: '100%',
                  borderColor: getError('phoneNumber') && '#d32f2f',
                  color: getError('phoneNumber') && '#d32f2f',
                }}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
              />
              {getError('phoneNumber') ? (
                  <Typography
                    sx={{
                      fontSize: '12px',
                      ml: '14px',
                      mt: '4px',
                      color: '#d32f2f',
                    }}
                  >
                    {getError('phoneNumber')}
                  </Typography>
                ) :
                (
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
                )
              }
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
                error={Boolean(getError('email') || !emailIsValid)}
                helperText={getError('email') ? getError('email') : emailLabel}
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
                {pups.length > 0 && (
                  <MenuItem value="" disabled>
                    Выберите ближайший ПВЗ
                  </MenuItem>
                )}
                {pups.length > 0 ? (
                  pups.map((pup) => (
                    <MenuItem key={pup._id} value={pup._id}>
                      <b style={{marginRight: '10px'}}>{pup.name}</b>
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
                  sx={{mt: 3, mb: 2, py: 1}}
                  disableElevation
                  disabled={!isFormValid() || loading}
                  loading={loading}
                >
                  {isEdit ? 'Обновить' : 'Зарегистрировать'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default StaffForm;
