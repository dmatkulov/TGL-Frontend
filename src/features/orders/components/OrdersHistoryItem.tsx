import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ShipmentThatDone } from '../../../types/types.Shipments';
import dayjs from 'dayjs';

const OrdersHistoryItem: FC<ShipmentThatDone> = ({
  pupId,
  price,
  trackerNumber,
  datetime,
}) => {
  const formattedDate = dayjs(datetime).format('YYYY-MM-DD HH:mm:ss');
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell>{formattedDate}</TableCell>
        <TableCell component="th" scope="row">
          {trackerNumber}
        </TableCell>
        <TableCell align="left">
          {pupId ? (
            pupId.address
          ) : (
            <span style={{ color: 'red', fontWeight: 700 }}>Нет ПВЗ</span>
          )}
        </TableCell>
        <TableCell align="left">{price.usd} USD</TableCell>
      </TableRow>
    </>
  );
};

export default OrdersHistoryItem;
