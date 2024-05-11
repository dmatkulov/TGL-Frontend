import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createShipment } from '../shipmentsThunk';
import React, { useState } from 'react';
import { ShipmentMutation } from '../../../types/types.Shipments';
import { addShipmentGetError, addShipmentGetLoad } from '../shipmentsSlice';
import InputAdornment from '@mui/material/InputAdornment';

const initialState: ShipmentMutation = {
  userMarketId: '',
  trackerNumber: '',
  weight: '',
  dimensions: {
    height: '',
    width: '',
    length: '',
  },
};

const ShipmentsForm = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<ShipmentMutation>(initialState);

  const loading = useAppSelector(addShipmentGetLoad);
  const error = useAppSelector(addShipmentGetError);

  const valueFields: string[] = [
    'userMarketId',
    'trackerNumber',
    'weight',
    'height',
    'width',
    'length',
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (parseFloat(value) <= 0) {
      return;
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
    const { userMarketId, trackerNumber, weight, dimensions } = state;

    return (
      userMarketId &&
      trackerNumber &&
      weight &&
      dimensions.height &&
      dimensions.length &&
      dimensions.width
    );
  };

  const onFormHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createShipment(state));
    setState(initialState);
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mt: 3, mb: 1, width: '100%' }}>
          {'Введенные данные не верны. Попробуйте снова!'}
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
                  <InputAdornment position="end">см</InputAdornment>
                ),
              }}
            />
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
