import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import OrdersRowItem from './OrdersRowItem';
import OrderModal from './OrderModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrders, selectOrdersLoading } from '../ordersSlice';
import { useEffect } from 'react';
import { selectUser } from '../../users/usersSlice';
import { fetchOrders } from '../ordersThunk';

const OrdersTable = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectOrdersLoading);
  const orders = useAppSelector(selectOrders);
  const user = useAppSelector(selectUser);

  const marketId = user?.marketId;

  useEffect(() => {
    if (marketId) {
      dispatch(fetchOrders(marketId));
    }
  }, [dispatch, marketId]);

  return (
    <>
      <OrderModal />
      {loading && <CircularProgress />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Трекинговый номер</TableCell>
              <TableCell align="left">Адрес</TableCell>
              <TableCell align="left">Стоимость</TableCell>
              <TableCell align="left">Статус</TableCell>
              <TableCell align="left">Доставка заказа</TableCell>
              <TableCell align="left">Отмена заказа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrdersRowItem
                  order={order}
                  marketId={marketId || ''}
                  key={order._id}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <Typography variant="body1">
                    У вас пока нет заказов.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersTable;
