import { Box, Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { createShipment } from '../shipmentsThunk';
import { useState } from 'react';
import { ShipmentMutation } from '../../../types/types.Shipments';

const ShipmentsForm = () => {
  const dispatch = useAppDispatch();

  const [state, setState] = useState<ShipmentMutation>({
    userMarketId: '',
    trackerNumber: '',
    weight: 0,
    dimensions: {
      height: 0,
      width: 0,
      length: 0,
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDimensionsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      dimensions: {
        ...prevState.dimensions,
        [name]: parseInt(value),
      },
    }));
  };

  const onFormHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    await dispatch(createShipment(state));
  };

  return (
    <>
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="weight"
              label="Масса"
              type="number"
              onChange={handleChange}
              value={state.weight}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="height"
              label="Высота"
              type="number"
              onChange={handleDimensionsChange}
              value={state.dimensions.height}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="length"
              label="Длина"
              type="number"
              onChange={handleDimensionsChange}
              value={state.dimensions.length}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="width"
              label="Ширина"
              type="number"
              onChange={handleDimensionsChange}
              value={state.dimensions.width}
            />
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 3 }}>
          Add shipment
        </Button>
      </Box>
    </>
  );
};

export default ShipmentsForm;
