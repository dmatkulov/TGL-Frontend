import { Button, IconButton, TableCell, TableRow } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
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
            onClick={showModal}
          >
            {delivery.status ? 'Отменить доставку' : 'Доставка'}
          </Button>
        </TableCell>
        <TableCell align="center">
          <LoadingButton
            sx={{minWidth: '29px', padding: '3px', borderRadius: "50%"}}
            loading={cancelLoading}
            disabled={cancelLoading}
            color="error">
            <IconButton sx={{color: 'inherit'}}>
              <CancelIcon />
            </IconButton>
          </LoadingButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrdersRowItem;
