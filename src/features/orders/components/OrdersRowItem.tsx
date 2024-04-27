import { Button, TableCell, TableRow } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrdersCancelLoading, toggleModal } from '../ordersSlice';
import { Order } from '../../../types/types.Order';
import { deleteOrder, fetchOrders } from '../ordersThunk';

interface Props {
  order: Order;
  marketId: string;
}

const OrdersRowItem: React.FC<Props> = ({ order, marketId }) => {
  const dispatch = useAppDispatch();
  const cancelLoading = useAppSelector(selectOrdersCancelLoading);

  const showModal = () => {
    dispatch(toggleModal(true));
  };

  const handleDelete = async () => {
    await dispatch(deleteOrder(order._id));
    await dispatch(fetchOrders(marketId));
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {order.trackerNumber}
        </TableCell>
        <TableCell align="left">{order.pupId.address}</TableCell>
        <TableCell align="left">{order.price.som} сом</TableCell>
        <TableCell align="left">{order.status}</TableCell>
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
            onClick={handleDelete}
          >
            Отменить заказ
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersRowItem;
