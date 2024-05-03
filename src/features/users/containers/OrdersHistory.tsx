import PageTitle from '../components/PageTitle';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../usersSlice';
import { useEffect } from 'react';
import { fetchShipmentsHistoryByUser } from '../../shipments/shipmentsThunk';
import OrdersHistoryItem from '../../orders/components/OrdersHistoryItem';
import { selectOrders } from '../../orders/ordersSlice';

const OrdersHistory = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const history = useAppSelector(selectOrders);

  useEffect(() => {
    if (user) {
      dispatch(fetchShipmentsHistoryByUser(user.marketId));
    }
  }, [dispatch, user]);

  return (
    <>
      <PageTitle title="История заказов" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Трекинговый номер</TableCell>
              <TableCell align="left">Адрес ПВЗ</TableCell>
              <TableCell align="left">Стоимость</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <OrdersHistoryItem
                pupId={item.pupId}
                price={item.price}
                trackerNumber={item.trackerNumber}
                key={item._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersHistory;
