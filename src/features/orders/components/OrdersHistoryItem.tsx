import { FC } from 'react';
import { TableCell, TableRow } from '@mui/material';
import { ShipmentThatDone } from '../../../types/types.Shipments';

const OrdersHistoryItem: FC<ShipmentThatDone> = ({
  pupId,
  price,
  trackerNumber,
}) => {
  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
        <TableCell align="left">{price.som} СОМ</TableCell>
      </TableRow>
    </>
  );
};

export default OrdersHistoryItem;
