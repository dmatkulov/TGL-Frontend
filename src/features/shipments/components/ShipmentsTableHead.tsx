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
        <TableCell
          style={{ fontWeight: 'bold', padding: '10px 0 10px 16px' }}
          padding="checkbox"
        >
          <Checkbox
            style={{ marginRight: '10px' }}
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
        <TableCell
          style={{ fontWeight: 'bold', paddingRight: '0', paddingLeft: 0 }}
        />
        <TableCell
          style={{ fontWeight: 'bold', paddingRight: '0', paddingLeft: 0 }}
          padding="checkbox"
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        <TableCell style={{ fontWeight: 'bold', paddingRight: '0' }}>
          Трек номер
        </TableCell>
        <TableCell style={{ fontWeight: 'bold', paddingRight: '0' }}>
          Маркет ID
        </TableCell>
        <TableCell style={{ fontWeight: 'bold', paddingRight: '0' }}>
          Статус
        </TableCell>
        <TableCell style={{ fontWeight: 'bold', paddingRight: '0' }}>
          Оплата
        </TableCell>
        <TableCell style={{ fontWeight: 'bold', paddingRight: '0' }} />
        <TableCell style={{ fontWeight: 'bold', paddingRight: '0' }} />
      </TableRow>
    );
  }

  return tableHead;
};

export default ShipmentsTableHead;
