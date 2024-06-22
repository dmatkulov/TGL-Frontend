import { Checkbox, TableCell, TableRow } from '@mui/material';
import React from 'react';

interface Props {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShipmentsTableHead: React.FC<Props> = ({
  numSelected,
  rowCount,
  onSelectAllClick,
}) => {
  return (
    <TableRow>
      <TableCell />
      <TableCell style={{ fontWeight: 'bold' }} padding="checkbox">
        <Checkbox
          color="primary"
          indeterminate={numSelected > 0 && numSelected < rowCount}
          checked={rowCount > 0 && numSelected === rowCount}
          onChange={onSelectAllClick}
        />
      </TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Трек номер</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Маркет ID</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Статус</TableCell>
      <TableCell style={{ fontWeight: 'bold' }}>Оплата</TableCell>
      <TableCell />
      <TableCell />
    </TableRow>
  );
};

export default ShipmentsTableHead;
