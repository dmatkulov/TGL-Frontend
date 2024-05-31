import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createShipment } from '../shipmentsThunk';
import React, { useEffect, useState } from 'react';
import { ShipmentMutation } from '../../../types/types.Shipments';
import { addShipmentGetError, addShipmentGetLoad } from '../shipmentsSlice';
import InputAdornment from '@mui/material/InputAdornment';
import { selectPups, selectPupsLoading } from '../../pups/pupsSlice';
import { fetchPups } from '../../pups/pupsThunks';
import { ShipmentStatus } from '../../../utils/constants';

const initialState: ShipmentMutation = {
  userMarketId: '',
  trackerNumber: '',
  weight: '',
  pupId: '',
  status: '',
  dimensions: {
    height: '',
    width: '',
    length: '',
  },
};

const isInputValid = (marketIdString: string) => {
  const regex = /^\d{5}$/;
  return regex.test(marketIdString);
};

const ShipmentsForm = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ShipmentMutation>(initialState);
  const [marketIdValid, setMarketIdValid] = useState<boolean>(false);
  const [userMarketIdLabel, setUserMarketIdLabel] = useState<string>('');

  const pups = useAppSelector(selectPups);
  const loadingPups = useAppSelector(selectPupsLoading);
  const loading = useAppSelector(addShipmentGetLoad);
  const error = useAppSelector(addShipmentGetError);

  const valueFields: string[] = [
    'userMarketId',
    'trackerNumber',
    'weight',
    'height',
    'width',
    'length',
    'pupId',
    'status',
  ];



  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (parseFloat(value) <= 0) {
      return;
    }

    if (isInputValid(state.userMarketId)) {
      setMarketIdValid(true);
      setUserMarketIdLabel('Не корректный номер')
    }

    if (valueFields.includes(name)) {
      setState((prevState) => ({
        ...prevState,
        [name]: value,
        dimensions: {
          ...prevState.dimensions,
          [name]: value,
        },
      }));
    }
  };

  const isFormValid = () => {
    const { userMarketId, trackerNumber, weight, dimensions, status } = state;

    return (
      userMarketId &&
      trackerNumber &&
      weight &&
      dimensions.height &&
      dimensions.length &&
      dimensions.width &&
      status
    );
  };

  const onFormHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createShipment(state));
    setState(initialState);
  };

  useEffect(() => {
    dispatch(fetchPups());
  }, [dispatch]);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 1, width: '100%' }}>
          {'Введенные данные не верны. Попробуйте снова!'}
        </Alert>
      )}
      {loading && (
        <Alert severity="success" sx={{ mt: 3, mb: 1, width: '100%' }}>
          {'Данные успешно отправлены!'}
        </Alert>
      )}
      <Box component="form" onSubmit={onFormHandle}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              name="userMarketId"
              label="Маркет"
              onChange={handleChange}
              value={state.userMarketId}
              autoComplete="new-userMarketId"
              error={marketIdValid}
              helperText={userMarketIdLabel}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">№</InputAdornment>
                ),
              }}
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              type="number"
              name="trackerNumber"
              label="Номер трека"
              onChange={handleChange}
              value={state.trackerNumber}
              autoComplete="new-trackerNumber"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">№</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="height"
              type="number"
              label="Высота"
              onChange={handleChange}
              value={state.dimensions.height}
              autoComplete="new-height"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="length"
              type="number"
              label="Длина"
              onChange={handleChange}
              value={state.dimensions.length}
              autoComplete="new-length"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="width"
              type="number"
              label="Ширина"
              onChange={handleChange}
              value={state.dimensions.width}
              autoComplete="new-width"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="weight"
              type="number"
              label="Килограмм"
              onChange={handleChange}
              value={state.weight}
              autoComplete="new-weight"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">кг</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              select
              name="status"
              label="Статус"
              type="text"
              value={state.status}
              autoComplete="new-status"
              onChange={handleChange}
            >
              {ShipmentStatus.length > 0 && (
                <MenuItem value="" disabled>
                  Выберите статус заказа
                </MenuItem>
              )}
              {ShipmentStatus.length > 0 &&
                ShipmentStatus.map((shipment) => (
                  <MenuItem key={shipment.id} value={shipment.name}>
                    {shipment.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              disabled={loadingPups}
              select
              name="pupId"
              label="ПВЗ"
              type="text"
              value={state.pupId}
              autoComplete="new-pupId"
              onChange={handleChange}
            >
              {pups.length > 0 && (
                <MenuItem value="" disabled>
                  Выберите ближайший ПВЗ
                </MenuItem>
              )}
              {pups.length > 0 &&
                pups.map((pup) => (
                  <MenuItem key={pup._id} value={pup._id}>
                    <b style={{ marginRight: '10px' }}>{pup.name}</b>
                    {pup.region.name} обл., {pup.address}, {pup.settlement}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!isFormValid() || loading}
        >
          {loading ? <CircularProgress /> : 'Добавить отправку'}
        </Button>
      </Box>
    </>
  );
};

export default ShipmentsForm;
