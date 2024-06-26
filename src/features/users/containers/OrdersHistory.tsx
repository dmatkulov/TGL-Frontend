import PageTitle from '../components/PageTitle';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import React, { useEffect, useState } from 'react';
import { fetchShipmentsHistoryByUser } from '../../shipments/shipmentsThunk';
import OrdersHistoryItem from '../../orders/components/OrdersHistoryItem';
import { selectOrders } from '../../orders/ordersSlice';
import OrdersHistoryItemCard from '../../orders/components/OrdersHistoryItemCard';

const OrdersHistory = () => {
  const extraSmallScreen = useMediaQuery('(max-width:530px)');
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const isExtraSmallScreen = useMediaQuery('(max-width:680px)');

  useEffect(() => {
    if (user) {
      dispatch(fetchShipmentsHistoryByUser(user.marketId));
    }
  }, [dispatch, user]);

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

  return (
    <>
      <PageTitle title="История заказов" />
      {extraSmallScreen ? (
        <>
          <Grid container>
            {history
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <Grid item xs={12} key={item._id}>
                  <OrdersHistoryItemCard
                    key={item._id}
                    pupId={item.pupId}
                    price={item.price}
                    trackerNumber={item.trackerNumber}
                    datetime={item.datetime}
                  />
                </Grid>
              ))}
            <Grid item xs={12}>
              <TablePagination
                labelRowsPerPage={isExtraSmallScreen ? '' : undefined}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={history.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Дата</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>
                  Трекинговый номер
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Адрес ПВЗ
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                  Стоимость
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
                  <OrdersHistoryItem
                    pupId={item.pupId}
                    price={item.price}
                    trackerNumber={item.trackerNumber}
                    key={item._id}
                    datetime={item.datetime}
                  />
                ))}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage="Рядов на таблице"
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={history.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  );
};

export default OrdersHistory;
