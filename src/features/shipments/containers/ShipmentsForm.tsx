import { Alert, Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createShipment } from '../shipmentsThunk';
import { useState } from 'react';
import { ShipmentMutation } from '../../../types/types.Shipments';
import { addShipmentGetError, addShipmentGetLoad } from '../shipmentsSlice';

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

  const valueFields: string [] = ['userMarketId', 'trackerNumber', 'weight', 'height', 'width', 'length'];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (valueFields.includes(name)) {
      setState(prevState => ({
        ...prevState,
        [name]: value,
        dimensions: {
          ...prevState.dimensions,
          [name]: value,
        },
      }));
    }
  };

  const onFormHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createShipment(state));
    setState(initialState);
  };

  return (
    <>
      {error && (
        <Alert severity="error" sx={{mt: 3, mb: 1, width: '100%'}}>
          {'Введенные данные не верны. Попробуйте снова!'}
        </Alert>
      )}
      {loading && (
        <Alert severity="success" sx={{mt: 3, mb: 1, width: '100%'}}>
          {'Данные успешно отправлены!'}
        </Alert>
      )}
      <Box component="form" onSubmit={onFormHandle}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="userMarketId"
              label="Маркет"
              onChange={handleChange}
              value={state.userMarketId}
              autoComplete="new-userMarketId"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="trackerNumber"
              label="Номер трека"
              onChange={handleChange}
              value={state.trackerNumber}
              autoComplete="new-trackerNumber"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="height"
              label="Высота"
              onChange={handleChange}
              value={state.dimensions.height}
              autoComplete="new-height"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="length"
              label="Длина"
              onChange={handleChange}
              value={state.dimensions.length}
              autoComplete="new-length"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="width"
              label="Ширина"
              onChange={handleChange}
              value={state.dimensions.width}
              autoComplete="new-width"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              name="weight"
              label="Килограмм"
              onChange={handleChange}
              value={state.weight}
              autoComplete="new-weight"
              autoFocus
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
          disabled={loading}>
          {loading ? <CircularProgress /> : 'Добавить отправку'}
        </Button>
      </Box>
    </>
  );
};

export default ShipmentsForm;