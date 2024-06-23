import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectShipments, selectShipmentsLoading } from '../shipmentsSlice';
import { fetchShipments, searchByTrack } from '../shipmentsThunk';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { selectOneOrder, selectOrdersLoading } from '../../orders/ordersSlice';
import { LoadingButton } from '@mui/lab';
import SearchIcon from '@mui/icons-material/Search';
import ShipmentsTable from '../components/ShipmentsTable';
import { selectUser } from '../../users/usersSlice';

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
  const isSmallScreen = useMediaQuery('(max-width:380px)');
  const isLargeScreen = useMediaQuery('(min-width:678px)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const searchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.trim() === '') {
      return;
    }
    setSearched(true);
    await dispatch(searchByTrack(state));
  };

  const clearFilter = async () => {
    setSearched(false);
    setState('');
    await dispatch(fetchShipments());
  };

  const refetchData = () => {
    if (searched) {
      dispatch(searchByTrack(state));
      return;
    }
    dispatch(fetchShipments());
  };

  useEffect(() => {
    const updateShipments = () => {
      dispatch(fetchShipments());
    };

    updateShipments();

    const intervalId = setInterval(updateShipments, 1800000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (user && user?.role === 'manager' && user.region) {
    filteredShipments = shipments.filter(
      (shipment) => shipment.pupId?.region === user.region._id,
    );
  }

  let content;

  if (loading) {
    content = (
      <div style={styleBoxSpinner}>
        <CircularProgress size={100} />
      </div>
    );
  } else if (searched) {
    content = (
      <ShipmentsTable
        onDataSend={refetchData}
        state={filteredShipments}
        searchResult={order}
      />
    );
  } else {
    content = (
      <ShipmentsTable onDataSend={refetchData} state={filteredShipments} />
    );
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
        mb={6}
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
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent={!isLargeScreen ? 'space-between' : 'flex-start'}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            disabled={loadingOneOrder}
            loading={loadingOneOrder}
            loadingPosition="start"
            startIcon={<SearchIcon />}
            fullWidth={isSmallScreen}
          >
            Поиск
          </LoadingButton>
          <Button
            type="button"
            variant="contained"
            disabled={loadingOneOrder || !searched}
            color="error"
            onClick={clearFilter}
            fullWidth={isSmallScreen}
          >
            {isSmallScreen ? 'Сбросить' : 'Сбросить фильтр'}
          </Button>
        </Grid>
      </Grid>

      {content}
    </>
  );
};

export default Shipments;
