import { Button, TableCell, TableRow } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch } from '../../../app/hooks';
import { toggleModal } from '../ordersSlice';

const OrdersRowItem = () => {
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(toggleModal(true));
  };
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          0101 0000 0000
        </TableCell>
        <TableCell align="left">Адрес пункта выдачи заказа</TableCell>
        <TableCell align="left">990 сом</TableCell>
        <TableCell align="left">
          <Button onClick={showModal}>Доставка</Button>
        </TableCell>
        <TableCell align="left">
          <LoadingButton>Отменить заказ</LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersRowItem;
