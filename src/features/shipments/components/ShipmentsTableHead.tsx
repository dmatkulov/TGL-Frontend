import { TableCell, TableRow } from '@mui/material';

const ShipmentsTableHead = () => {
  return (
    <TableRow>
      <TableCell />
      <TableCell style={{ fontWeight: 'bold' }}>Трек номер</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>marketId</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Статус</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Оплачено</TableCell>
    </TableRow>
  );
};

export default ShipmentsTableHead;
