import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { regionsState } from '../../regions/regionsSlice';
import { fetchPups } from '../../pups/pupsThunks';
import { selectPups, selectPupsLoading } from '../../pups/pupsSlice';
import React, { useEffect, useRef, useState } from 'react';
import {
  fetchShipments,
  fetchShipmentsByRegionAndPup,
} from '../../shipments/shipmentsThunk';
import {
  selectShipments,
  selectShipmentsLoading,
} from '../../shipments/shipmentsSlice';
import { Statistics as statistics } from '../../../types/types.Statistics';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

const initialState: statistics = {
  pupId: '',
  region: '',
  datetime: '',
};

const styleBoxSpinner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Statistics = () => {
  const isSmallScreen = useMediaQuery('(max-width:1200px)');
  const regions = useAppSelector(regionsState);
  const loadingPups = useAppSelector(selectPupsLoading);
  const pups = useAppSelector(selectPups);
  const shipments = useAppSelector(selectShipments);
  const loading = useAppSelector(selectShipmentsLoading);
  const dispatch = useAppDispatch();

  const tableWrapperRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<statistics>(initialState);

  const fetchPupsByRegion = async (region: string) => {
    await dispatch(fetchPups(region));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(
        fetchShipmentsByRegionAndPup({
          pupId: state.pupId,
          datetime: state.datetime,
        }),
      );

      setState(initialState);
    } catch (e) {
      console.error(e);
    }
  };

  const statisticAll = async () => {
    await dispatch(fetchShipments());
    setState(initialState);
  };

  return (
    <>
      <Alert sx={{ width: 450, marginBottom: 1 }} severity="warning">
        Для получения статистики, пожалуйста, укажите все параметры
      </Alert>

      <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
        <Grid
          component={'form'}
          onSubmit={submitFormHandler}
          sx={{ marginRight: 3 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: 200, marginBottom: 1 }}
              select
              required
              name="region"
              label="Регион"
              type="text"
              value={state.region}
              autoComplete="new-region"
              onChange={inputChangeHandler}
            >
              <MenuItem value="" disabled>
                Выберите область
              </MenuItem>
              {regions.map((region) => (
                <MenuItem
                  key={region._id}
                  value={region._id}
                  onClick={() => fetchPupsByRegion(region._id)}
                >
                  {region.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: 200 }}
              disabled={loadingPups}
              required
              select
              name="pupId"
              label="ПВЗ"
              type="text"
              value={state.pupId}
              autoComplete="new-pupID"
              onChange={inputChangeHandler}
            >
              {pups.length > 0 && (
                <MenuItem value="" disabled>
                  Выберите ближайший ПВЗ
                </MenuItem>
              )}
              {pups.length > 0 ? (
                pups.map((pup) => (
                  <MenuItem key={pup._id} value={pup._id}>
                    <b style={{ marginRight: '10px' }}>{pup.name}</b>
                    {pup.region.name} обл., {pup.address}, {pup.settlement}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Сначала выберите регион
                </MenuItem>
              )}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              sx={{ width: 200, marginTop: 1, marginBottom: 1 }}
              select
              name="datetime"
              label="Период"
              type="text"
              value={state.datetime}
              autoComplete="new-datetime"
              onChange={inputChangeHandler}
            >
              <MenuItem value="" disabled>
                Выберите период
              </MenuItem>

              <MenuItem value="month">За месяц</MenuItem>

              <MenuItem value="year">За год</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={loading}
              sx={{
                '&.MuiButton-root:hover': { background: '#018749' },
                color: 'white',
                width: 200,
                background: 'green',
                marginBottom: 1,
              }}
              type={'submit'}
            >
              Поиск
            </Button>
          </Grid>
          <Button
            disabled={loading}
            sx={{
              '&.MuiButton-root:hover': { background: '#D2122E' },
              color: 'white',
              width: 200,
              background: '#9e1b32',
            }}
            onClick={() => statisticAll()}
          >
            Сбросить
          </Button>
        </Grid>

        <Box ref={tableWrapperRef} sx={{ width: '100%' }}>
          {shipments.length === 0 && (
            <Alert severity="info">Заказов за этот период нет</Alert>
          )}
          {loading ? (
            <Box sx={styleBoxSpinner}>
              <CircularProgress size={100} />
            </Box>
          ) : (
            <Box sx={{ width: tableWrapperRef?.current?.clientWidth }}>
              <TableContainer
                component={Paper}
                sx={{
                  overflowX: isSmallScreen ? 'scroll' : '',
                }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ textTransform: 'uppercase' }}>
                      <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                        Пользователь
                      </TableCell>
                      <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                        Статус
                      </TableCell>
                      <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                        Оплачено
                      </TableCell>
                      <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                        Номер трэка
                      </TableCell>
                      <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                        Цена
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow
                        key={shipment._id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {shipment.userId.firstName}
                        </TableCell>
                        <TableCell align="left">{shipment.status}</TableCell>
                        <TableCell align="left">
                          {shipment.isPaid ? 'Да' : 'Нет'}
                        </TableCell>
                        <TableCell align="left">
                          {shipment.trackerNumber}
                        </TableCell>
                        <TableCell align="left">{shipment.price.som}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Statistics;
