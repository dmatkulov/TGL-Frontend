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

const StaffTable: FC<Props> = ({ children }) => {
  return (
    <>
      <TableContainer component={Paper} sx={{ mb: 4, mt: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ textTransform: 'uppercase' }}>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Почта
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Имя
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Фамилия
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Адрес
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>
                Номер телефона
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{/*{employee}*/}</TableBody>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StaffTable;
