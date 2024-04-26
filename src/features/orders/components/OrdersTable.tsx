import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, useMediaQuery,
} from '@mui/material';
import OrdersRowItem from './OrdersRowItem';
import OrderModal from './OrderModal';
import { useAppSelector } from '../../../app/hooks';
import { selectOrdersLoading } from '../ordersSlice';
import OrdersItem from './OrdersItem';

const OrdersTable = () => {
  const isSmallScreen = useMediaQuery('(max-width:705px)');

  const loading = useAppSelector(selectOrdersLoading);

  return (
    <>
      <OrderModal />
      {loading && <CircularProgress />}
      <TableContainer component={Paper} sx={{ display: isSmallScreen ? 'none' : '' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Трекинговый номер</TableCell>
              <TableCell align="left">Адрес</TableCell>
              <TableCell align="left">Стоимость</TableCell>
              <TableCell align="left">Доставка заказа</TableCell>
              <TableCell align="left">Отмена заказа</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <OrdersRowItem />
          </TableBody>
        </Table>
      </TableContainer>
      { isSmallScreen && <OrdersItem/> }
    </>
  );
};

export default OrdersTable;
