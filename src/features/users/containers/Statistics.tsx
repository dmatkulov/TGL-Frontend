import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Stack,
  TablePagination,
  TextField,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { regionsState } from '../../regions/regionsSlice';
import { fetchPups } from '../../pups/pupsThunks';
import { clearItems, selectPups, selectPupsLoading } from '../../pups/pupsSlice';
import React, { useEffect, useRef, useState } from 'react';
import { fetchShipments, fetchShipmentsByQuery } from '../../shipments/shipmentsThunk';
import { selectShipments, selectShipmentsLoading } from '../../shipments/shipmentsSlice';
import { Statistics as statistics } from '../../../types/types.Statistics';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { fetchRegions } from '../../regions/regionsThunks';
import { toast } from 'react-toastify';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { LoadingButton } from '@mui/lab';

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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searched, setSearched] = useState<boolean>(false);
  
  useEffect(() => {
    dispatch(clearItems());
    dispatch(fetchRegions());
  }, [dispatch]);
  
  const fetchPupsByRegion = async (region: string) => {
    await dispatch(fetchPups(region));
  };
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipments.length) : 0;
  
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const renderMultiple = (
    rowsPerPage > 0
      ? shipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : shipments
  ).map((shipment) => (
    <TableRow
      key={shipment._id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell align="left">{shipment.userId.firstName}</TableCell>
      <TableCell align="left">{shipment.status}</TableCell>
      <TableCell align="left">{shipment.isPaid ? 'Да' : 'Нет'}</TableCell>
      <TableCell align="left">{shipment.trackerNumber}</TableCell>
      <TableCell align="left">{shipment.price.som}</TableCell>
    </TableRow>
  ));
  
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
    
    if (!state.pupId && !state.region && !state.datetime) {
      toast.warning('Пожалуйста, заполните хотя бы одно поле.');
      return;
    }
    
    await dispatch(fetchShipmentsByQuery(state));
    setSearched(true);
  };
  
  const statisticAll = async () => {
    dispatch(clearItems());
    setState(initialState);
    setSearched(false);
    await dispatch(fetchShipments());
  };
  
  return (
    <>
      <Alert sx={{ width: '100%', marginBottom: 3 }} severity="warning">
        Для получения статистики, пожалуйста, укажите нужные параметры
      </Alert>
      
      <Box
        display={'flex'}
        sx={{ justifyContent: 'space-between', flexDirection: 'column' }}
      >
        <Grid
          component="form"
          onSubmit={submitFormHandler}
          sx={{ marginBottom: 3 }}
          container
          spacing={2}
        >
          <Grid item xs={12} sm={3}>
            <TextField
              sx={{ width: '100%' }}
              select
              size="small"
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
                  onClick={() => {
                    void fetchPupsByRegion(region._id);
                  }}
                >
                  {region.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              sx={{ width: '100%' }}
              disabled={loadingPups}
              select
              size="small"
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
                    {`${pup.name} ${pup.region.name} обл., ${pup.address}, ${pup.settlement}`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="" disabled>
                  Сначала выберите регион
                </MenuItem>
              )}
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={3}>
            <TextField
              sx={{ width: '100%' }}
              select
              size="small"
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
              
              <MenuItem value="month">За прошлый месяц</MenuItem>
              
              <MenuItem value="year">За год</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack direction="row" spacing={2}>
              <LoadingButton
                fullWidth
                disabled={loading}
                loading={loading}
                variant="contained"
                type="submit"
              >
                Поиск
              </LoadingButton>
              <Button
                fullWidth
                type="button"
                variant="contained"
                disabled={loading || !searched}
                color="error"
                onClick={() => statisticAll()}
              >
                Сбросить
              </Button>
            </Stack>
          </Grid>
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
                    {renderMultiple}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <tfoot>
                  <TableRow>
                    <TablePagination
                      style={{ width: '100%' }}
                      rowsPerPageOptions={[5, 10, 20]}
                      colSpan={6}
                      labelRowsPerPage="Рядов на странице"
                      count={shipments.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      slotProps={{
                        select: {
                          inputProps: {
                            'aria-label': 'Показать',
                          },
                          native: true,
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                  </tfoot>
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
