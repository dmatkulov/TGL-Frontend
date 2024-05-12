import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  isPriceListsDeleting,
  isPriceListsEmpty,
  isPriceListsLoading,
  priceListsState,
} from './priceListsSlice';
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { deletePriceList, fetchAllPriceLists } from './priceListsThunks';
import { NavLink } from 'react-router-dom';
import { appRoutes } from '../../utils/constants';
import { LoadingButton } from '@mui/lab';

const PriceLists = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(priceListsState);
  const isLoading = useAppSelector(isPriceListsLoading);
  const isEmpty = useAppSelector(isPriceListsEmpty);
  const isDeleting = useAppSelector(isPriceListsDeleting);

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchAllPriceLists());
  }, [dispatch]);

  let content;

  if (isEmpty && !isLoading) {
    content = <Typography>Нет доступных прайс листов</Typography>;
  }
  if (isLoading) {
    content = <CircularProgress color="secondary" />;
  }
  if (!isEmpty && !isLoading) {
    content = (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Плотность</TableCell>
              <TableCell align="right">Стоимость</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state[value]?.ranges.map((item) => (
              <TableRow
                key={item.range}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.range}
                </TableCell>
                <TableCell align="right">{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const deleteHandler = async () => {
    const id = state[value]._id;
    await dispatch(deletePriceList(id));
    setValue(0);
    dispatch(fetchAllPriceLists());
  };

  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Button component={NavLink} to={appRoutes.priceListsAdd}>
            Добавить прайс лист
          </Button>
          <LoadingButton loading={isDeleting} onClick={deleteHandler}>
            Удалить текущий
          </LoadingButton>
        </Grid>
        <Grid item>
          <Tabs value={value} onChange={handleChange}>
            {state.map((item, index) => (
              <Tab label={item.name} key={item._id} value={index} />
            ))}
          </Tabs>
        </Grid>
        <Grid item>{content}</Grid>
      </Grid>
    </>
  );
};

export default PriceLists;