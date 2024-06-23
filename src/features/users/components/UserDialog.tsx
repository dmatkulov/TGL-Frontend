import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import PhoneInput from 'react-phone-input-2';
import { IUser } from '../../../types/types.User';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { regionsState } from '../../regions/regionsSlice';
import { selectPups } from '../../pups/pupsSlice';
import {
  selectOneUser,
  selectRegisterError,
  selectRegisterLoading,
  setRegisterError,
} from '../usersSlice';
import { fetchRegions } from '../../regions/regionsThunks';
import { fetchPups } from '../../pups/pupsThunks';

interface Props {
  onSubmit: (data: IUser) => void;
  open: boolean;
  onClose: () => void;
}

const UserDialog: React.FC<Props> = ({ onSubmit, onClose, open }) => {
  const regions = useAppSelector(regionsState);
  const pups = useAppSelector(selectPups);
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const loading = useAppSelector(selectRegisterLoading);
  const oneUser = useAppSelector(selectOneUser);
  const [formData, setFormData] = useState<IUser>({
    email: '',
    pupID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    region: '',
    settlement: '',
    address: '',
  });
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  useEffect(() => {
    setFormData({
      email: oneUser?.email || '',
      pupID: oneUser?.pupID ? oneUser?.pupID._id : '',
      firstName: oneUser?.firstName || '',
      middleName: oneUser?.middleName || '',
      lastName: oneUser?.lastName || '',
      phoneNumber: oneUser?.phoneNumber || '',
      region: oneUser?.region._id,
      settlement: oneUser?.settlement || '',
      address: oneUser?.address || '',
    });
  }, [oneUser]);

  const getErrorMessage = (field: string) => {
    try {
      return error?.errors[field].message;
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prevState) => {
      if (value.length < 12) {
        setPhoneError('Номер должен быть введен полностью');
      } else {
        setPhoneError('');
      }
      return { ...prevState, phoneNumber: value };
    });
  };

  useEffect(() => {
    dispatch(setRegisterError(null));
    dispatch(fetchRegions());
    dispatch(fetchPups(formData.region));
  }, [dispatch, formData.region]);

  const handleRegionChange = async (region: string) => {
    await dispatch(fetchPups(region));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.phoneNumber && formData.phoneNumber.length < 12) {
      setPhoneError('Пропишите номер полностью');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && emailRegex.test(formData.email)) {
      setEmailIsValid(true);
    } else {
      setEmailError('Неверный формат электронной почты');
      setEmailIsValid(false);
      return;
    }

    onSubmit(formData);
    onClose();
    setFormData({
      email: '',
      pupID: '',
      firstName: '',
      middleName: '',
      lastName: '',
      phoneNumber: '',
      region: '',
      settlement: '',
      address: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={{ mt: '20px' }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <Button
              sx={{
                '&.MuiButton-root:hover': { background: '#c6001c' },
                color: 'white',
                background: '#9e1b32',
              }}
              onClick={onClose}
            >
              X
            </Button>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  name="firstName"
                  label="Имя"
                  type="text"
                  value={formData.firstName}
                  autoComplete="new-firstName"
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('firstName'))}
                  helperText={getErrorMessage('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  required
                  name="lastName"
                  label="Фамилия"
                  type="text"
                  value={formData.lastName}
                  autoComplete="new-lastName"
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('lastName'))}
                  helperText={getErrorMessage('lastName')}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="middleName"
                  label="Отчество"
                  type="text"
                  value={formData.middleName}
                  autoComplete="new-middleName"
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('middleName'))}
                  helperText={getErrorMessage('middleName')}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <PhoneInput
                  country="kg"
                  masks={{ kg: '(...) ..-..-..' }}
                  onlyCountries={['kg']}
                  containerStyle={{ width: '100%' }}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  defaultErrorMessage={getErrorMessage('phoneNumber')}
                  disableDropdown
                  inputStyle={{
                    width: '100%',
                    borderColor: getErrorMessage('phoneNumber') && '#d32f2f',
                    color: getErrorMessage('phoneNumber') && '#d32f2f',
                  }}
                  inputProps={{
                    id: 'phoneNumber',
                    name: 'phoneNumber',
                    required: true,
                  }}
                />
                {getErrorMessage('phoneNumber') ? (
                  <Typography
                    sx={{ fontSize: '12px', mt: '4px', color: '#d32f2f' }}
                  >
                    {getErrorMessage('phoneNumber')}
                  </Typography>
                ) : (
                  <Typography
                    sx={{ fontSize: '12px', mt: '4px', color: '#d32f2f' }}
                  >
                    {phoneError}
                  </Typography>
                )}
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
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('email') || !emailIsValid)}
                  helperText={
                    getErrorMessage('email')
                      ? getErrorMessage('email')
                      : emailError
                  }
                  sx={{
                    '.MuiFormHelperText-root': {
                      color: emailIsValid ? 'inherit' : '#d32f2f',
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
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
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('region'))}
                  helperText={getErrorMessage('region')}
                >
                  <MenuItem value="" disabled>
                    Выберите область
                  </MenuItem>
                  {regions.length > 0 &&
                    regions.map((region) => (
                      <MenuItem
                        key={region._id}
                        value={region._id}
                        onClick={() => handleRegionChange(region._id)}
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
                  value={pups.length > 0 ? formData.pupID : ''}
                  autoComplete="new-pupID"
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('pupID'))}
                  helperText={getErrorMessage('pupID')}
                >
                  {pups.length > 0 && (
                    <MenuItem value="" disabled>
                      Выберите ближайший ПВЗ
                    </MenuItem>
                  )}
                  {pups.length > 0 ? (
                    pups.map((pup) => (
                      <MenuItem key={pup._id} value={pup._id}>
                        {`${pup.name} ${pup.region.name} обл., ${pup.address}, ${pup.settlement}`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      Сначала выберите регион
                    </MenuItem>
                  )}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  name="settlement"
                  label="Населенный пункт"
                  type="text"
                  value={formData.settlement}
                  autoComplete="new-settlement"
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('settlement'))}
                  helperText={getErrorMessage('settlement')}
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
                  onChange={handleInputChange}
                  error={Boolean(getErrorMessage('address'))}
                  helperText={getErrorMessage('address')}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
              <Grid item>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, py: 1 }}
                  disableElevation
                  disabled={!isFormValid() || loading}
                  loading={loading}
                >
                  Обновить
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
