import PageTitle from '../components/PageTitle';
import {
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
        history.map((item) => (
          <OrdersHistoryItemCard
            key={item._id}
            pupId={item.pupId}
            price={item.price}
            trackerNumber={item.trackerNumber}
            datetime={item.datetime}
          />
        ))
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
