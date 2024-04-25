import React, { useState } from 'react';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Warehouse } from '../../../types/types.Warehouses';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { isWarehousesCreateLoading } from '../warehousesSlice';
import { createWarehouse } from '../warehousesThunks';
import PhoneInput from 'react-phone-input-2';
import {selectRegisterError} from '../../users/usersSlice';
import {useNavigate} from 'react-router-dom';
import {appRoutes} from '../../../utils/constants';

const WarehouseForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreateLoading = useAppSelector(isWarehousesCreateLoading);
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [state, setState] = useState<Warehouse>({
    name: '',
    address: '',
    phoneNumber: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handlePhoneChange = (value: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(createWarehouse(state));
      setState({ name: '', address: '', phoneNumber: '' });
      navigate(appRoutes.adminWarehouses);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Добавить склад
        </Typography>
        <Box
          component="form"
          onSubmit={submitFormHandler}
          sx={{ mt: 3, width: '100%' }}
        >
          <Grid container spacing={2} alignItems="start">
            <Grid
              container
              item
              xs={12}
              sm={6}
              direction="row"
              spacing={2}
              sx={{ margin: 'auto' }}
            >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="name"
                  label="Название"
                  type="text"
                  value={state.name}
                  autoComplete="new-name"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="address"
                  label="Aдрес"
                  type="text"
                  value={state.address}
                  autoComplete="new-address"
                  onChange={inputChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  country="cn"
                  masks={{ cn: '(..) ...-....-....' }}
                  onlyCountries={['cn']}
                  containerStyle={{ width: '100%' }}
                  value={state.phoneNumber}
                  onChange={handlePhoneChange}
                  defaultErrorMessage={getFieldError('phoneNumber')}
                  specialLabel="Номер телефона*"
                  disableDropdown
                  inputStyle={{ width: '100%' }}
                  inputProps={{
                    name: 'phoneNumber',
                    required: true,
                  }}
                />
              </Grid>
              <LoadingButton
                type={'submit'}
                variant="contained"
                loading={isCreateLoading}
                disabled={isCreateLoading}
                sx={{ marginTop: 1, marginLeft: 2, width: 690 }}
              >
                Сохранить
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default WarehouseForm;
