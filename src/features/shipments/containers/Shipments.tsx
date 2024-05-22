import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipments, selectShipmentsLoading } from '../shipmentsSlice';
import { fetchShipments, searchByTrack } from '../shipmentsThunk';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { selectUser } from '../../users/usersSlice';
import { selectOneOrder, selectOrdersLoading } from '../../orders/ordersSlice';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import ShipmentsTable from '../components/ShipmentsTable';
import ShipmentsSearchResult from '../components/ShipmentsSearchResult';

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Shipments = () => {
  const dispatch = useAppDispatch();
  const shipments = useAppSelector(selectShipments);
  const user = useAppSelector(selectUser);
  const order = useAppSelector(selectOneOrder);
  const loading = useAppSelector(selectShipmentsLoading);
  const loadingOneOrder = useAppSelector(selectOrdersLoading);
  let filteredShipments = [...shipments];
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

  const clearFilter = () => {
    setSearched(false);
    setState('');
  };

  useEffect(() => {
    const updateShipments = () => {
      dispatch(fetchShipments());
    };

    updateShipments();

    const intervalId = setInterval(updateShipments, 1800000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (user?.role === 'manager' && user.region) {
    filteredShipments = shipments.filter(
      (shipment) => shipment.pupId.region === user.region._id,
    );
  }

  let content;

  if (loading) {
    content = (
      <div style={styleBoxSpinner}>
        <CircularProgress size={100} />
      </div>
    );
  } else if (searched && order) {
    content = <ShipmentsSearchResult order={order} />;
  } else if (searched && order === null) {
    content = <Typography>Заказ не найден!</Typography>;
  } else {
    content = <ShipmentsTable shipments={filteredShipments} />;
  }

  return (
    <>
      <Grid
        container
        display="flex"
        flexWrap="wrap"
        component="form"
        onSubmit={searchOrder}
        spacing={2}
        justifyContent="space-between"
        mb={4}
      >
        <Grid item xs={12} md={6}>
          <TextField
            required
            name="search"
            label="поиск по трек номеру"
            size="small"
            sx={{
              width: '100%',
            }}
            value={state}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" gap={1} alignItems="center">
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={loadingOneOrder}
            loading={loadingOneOrder}
            loadingPosition="start"
            startIcon={<SearchIcon />}
          >
            Поиск
          </LoadingButton>
          <Button
            type="button"
            variant="contained"
            disabled={loadingOneOrder || !searched}
            color="error"
            onClick={clearFilter}
          >
            Сбросить фильтр
          </Button>
        </Grid>
      </Grid>

      {content}
    </>
  );
};

export default Shipments;
