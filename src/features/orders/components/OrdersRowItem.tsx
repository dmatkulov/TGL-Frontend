import { Button, TableCell, TableRow } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrdersCancelLoading, toggleModal } from '../ordersSlice';
import { FC } from 'react';
import { Shipment } from '../../../types/types.Shipments';

const OrdersRowItem: FC<Shipment> = ({
  _id,
  pupId,
  price,
  trackerNumber,
  status,
  delivery,
}) => {
  const dispatch = useAppDispatch();
  const cancelLoading = useAppSelector(selectOrdersCancelLoading);

  const showModal = () => {
    dispatch(toggleModal({ toggle: true, id: { _id } }));
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {trackerNumber}
        </TableCell>
        <TableCell align="left">{pupId.address}</TableCell>
        <TableCell align="left">{price.som} СОМ</TableCell>
        <TableCell align="left">{status}</TableCell>
        <TableCell align="left">
          <Button
            variant="contained"
            startIcon={<LocalShippingIcon />}
            onClick={showModal}
          >
            {delivery.status ? 'Отменить доставку' : 'Заказать доставку'}
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
