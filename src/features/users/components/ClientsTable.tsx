import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { FC } from 'react';

interface Props extends React.PropsWithChildren {}

const ClientsTable: FC<Props> = ({ children }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ textTransform: 'uppercase' }}>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              ID
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Ф
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              И
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              О
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Почта
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Область
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Нас. пункт
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Адрес
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              Номер
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              ПВЗ
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: 'bold' }}>
              УД
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientsTable;
