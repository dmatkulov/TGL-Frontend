import { Box, Button, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import React, { useState } from 'react';
import { searchByTrack } from '../../shipments/shipmentsThunk';
import { selectOneOrder } from '../ordersSlice';
import ShipmentsCard from '../../shipments/components/ShipmentsCard';

const UserOrdersTracking = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(selectOneOrder);

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
        <TextField
          required
          name="search"
          label="поиск по трек номеру"
          value={state}
          onChange={handleChange}
          sx={{ width: '500px', mt: 1 }}
        />
        <Button type="submit" sx={{ ml: 2, mt: 2 }} variant="contained">
          Поиск
        </Button>
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
