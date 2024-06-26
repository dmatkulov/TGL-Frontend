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
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

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
  const [datetime, setDatetime] = useState<Dayjs | null>(null);
  const isSmallScreen = useMediaQuery('(max-width:380px)');
  const isLargeScreen = useMediaQuery('(min-width:678px)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleDatetimeChange = (date: Dayjs | null) => {
    setDatetime(date);
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
    setDatetime(null);
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

  const getShipmentsWithDatetime = shipments.filter(
    (elem) => dayjs(elem.datetime).format('YYYY-MM-DD') === dayjs(datetime).format('YYYY-MM-DD'),
  );

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
  } else if (datetime !== null) {
    content = (
      <ShipmentsTable onDataSend={refetchData} state={getShipmentsWithDatetime} />
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
            disabled={!!(loadingOneOrder || datetime)}
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
            Сбросить
          </Button>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Получить грузы по дате"
              value={datetime}
              onChange={handleDatetimeChange}
              format="DD/MM/YYYY"
              disabled={!!state}
            />
          </LocalizationProvider>
          <Button
            type="button"
            variant="contained"
            disabled={loadingOneOrder || !datetime}
            color="error"
            onClick={clearFilter}
            fullWidth={isSmallScreen}
            sx={{ pl: "30px", pr: "30px" }}
          >
            Сбросить
          </Button>
        </Grid>
      </Grid>

      {content}
    </>
  );
};

export default Shipments;
