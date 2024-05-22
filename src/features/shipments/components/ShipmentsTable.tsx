import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import React from 'react';

interface Props extends React.PropsWithChildren {}
const ShipmentsTable: React.FC<Props> = ({ children }) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }}>Трек номер</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>marketId</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Статус</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Оплачено</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShipmentsTable;
