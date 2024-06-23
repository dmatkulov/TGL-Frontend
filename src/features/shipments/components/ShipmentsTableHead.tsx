import { Checkbox, TableCell, TableRow, useMediaQuery } from '@mui/material';
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
  const isLarge = useMediaQuery('(min-width:860px)');

  let tableHead;

  if (!isLarge) {
    tableHead = (
      <TableRow>
        <TableCell style={{ fontWeight: 'bold' }} padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
          Выбрать все
        </TableCell>
      </TableRow>
    );
  } else {
    tableHead = (
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
  }

  return tableHead;
};

export default ShipmentsTableHead;
