import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipments, selectShipmentsLoading } from '../shipmentsSlice';
import { fetchShipments, searchByTrack } from '../shipmentsThunk';
import ShipmentsCard from '../components/ShipmentsCard';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { selectUser } from '../../users/usersSlice';
import { selectOneOrder, selectOrdersLoading } from '../../orders/ordersSlice';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Shipments = () => {
  const dispatch = useAppDispatch();
  const isSmallScreen = useMediaQuery('(max-width:1000px)');
  const isExtraSmallScreen = useMediaQuery('(max-width:480px)');
  const shipments = useAppSelector(selectShipments);
  const user = useAppSelector(selectUser);
  const order = useAppSelector(selectOneOrder);
  const loading = useAppSelector(selectShipmentsLoading);
  const loadingOneOrder = useAppSelector(selectOrdersLoading);
  let filteredShipments = [...shipments];
  const [state, setState] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);

  let content;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const searchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    await dispatch(searchByTrack(state));
  };

  const clearFilter = () => {
    setSearched(false);
    setState('');
  };

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  if (user?.role === 'manager' && user.region) {
    filteredShipments = shipments.filter(
      (shipment) => shipment.pupId.region === user.region._id,
    );
  }

  if (searched && order) {
    content = <ShipmentsCard shipment={order} />;
  } else if (searched && order === null) {
    content = <Typography>Заказ не найден!</Typography>;
  } else {
    content = filteredShipments.map((shipment) => (
      <ShipmentsCard key={shipment._id} shipment={shipment} />
    ));
  }

  return (
    <>
      {loading ? (
        <Box sx={styleBoxSpinner}>
          <CircularProgress size={100} />
        </Box>
      ) : (
        <>
          <Box component="form" onSubmit={searchOrder}>
            <TextField
              required
              name="search"
              label="поиск по трек номеру"
              sx={{
                width: isExtraSmallScreen
                  ? '175px'
                  : isSmallScreen
                    ? '320px'
                    : '500px',
                mt: 1,
                mb: 2,
              }}
              value={state}
              onChange={handleChange}
            />
            <Button
              type="submit"
              sx={{ ml: 2, mt: 2 }}
              variant="contained"
              disabled={loadingOneOrder}
            >
              {loadingOneOrder ? <CircularProgress size={25} /> : 'Поиск'}
            </Button>
            <Button
              type="button"
              sx={{ ml: 2, mt: 2 }}
              variant="contained"
              disabled={loadingOneOrder}
              color="error"
              onClick={clearFilter}
            >
              {loadingOneOrder ? (
                <CircularProgress size={25} />
              ) : (
                'Сбросить фильтр'
              )}
            </Button>
          </Box>
          {content}
        </>
      )}
    </>
  );
};

export default Shipments;
