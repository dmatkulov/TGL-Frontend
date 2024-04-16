import { Button, TableCell, TableRow } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrdersCancelLoading, toggleModal } from '../ordersSlice';

const OrdersRowItem = () => {
  const dispatch = useAppDispatch();
  const cancelLoading = useAppSelector(selectOrdersCancelLoading);

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
          <Button
            variant="contained"
            startIcon={<LocalShippingIcon />}
            onClick={showModal}
          >
            Доставка
          </Button>
        </TableCell>
        <TableCell align="left">
          <LoadingButton
            startIcon={<CancelIcon />}
            loading={cancelLoading}
            disabled={cancelLoading}
            color="error"
          >
            Отменить заказ
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersRowItem;
