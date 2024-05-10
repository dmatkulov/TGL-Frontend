import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  isPriceListsEmpty,
  isPriceListsLoading,
  priceListsState,
} from './priceListsSlice';
import {
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
import { fetchAllPriceLists } from './priceListsThunks';

const PriceLists = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(priceListsState);
  const isLoading = useAppSelector(isPriceListsLoading);
  const isEmpty = useAppSelector(isPriceListsEmpty);

  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(fetchAllPriceLists());
    console.log(state);
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

  return (
    <>
      <Grid container direction="column" spacing={2}>
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
