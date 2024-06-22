import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import React, { useState } from 'react';
import { searchByTrack } from '../../shipments/shipmentsThunk';
import { selectOneOrder, selectOrdersLoading } from '../ordersSlice';
import ShipmentsCard from '../../shipments/components/ShipmentsCard';

const inputSearchGrid = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const buttonGridStyle = {
  sm: 12,
  display: 'flex',
  justifyContent: 'flex-start',
};

const UserOrdersTracking = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOneOrder);
  const loadingOneOrder = useAppSelector(selectOrdersLoading);
  const [state, setState] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const searchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    await dispatch(searchByTrack(state));
  };

  return (
    <>
      <Box component="form" onSubmit={searchOrder}>
        <Grid
          container
          spacing={2}
          direction={{
            xs: 'column',
            sm: 'row',
            md: 'row',
          }}
        >
          <Grid item sm={8} md={7} lg={6} sx={inputSearchGrid}>
            <TextField
              required
              name="search"
              label="Поиск по трек номеру"
              sx={{
                minWidth: '100%',
              }}
              value={state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item sx={buttonGridStyle}>
            <Button
              type="submit"
              sx={{ width: '100%', height: '100%' }}
              variant="contained"
              disabled={loadingOneOrder}
            >
              {loadingOneOrder ? <CircularProgress size={25} /> : 'Поиск'}
            </Button>
          </Grid>
        </Grid>
      </Box>
      {order && <ShipmentsCard shipment={order} />}
      {searched && !order && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          По вашему запросу ничего не найдено.
        </Typography>
      )}
    </>
  );
};

export default UserOrdersTracking;
