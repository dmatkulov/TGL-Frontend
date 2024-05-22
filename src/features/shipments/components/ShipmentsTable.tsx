import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import TablePaginationActions from './TablePaginationActions';
import { ShipmentData } from '../../../types/types.Shipments';
import ShipmentsRowItem from './ShipmentsRowItem';
import ShipmentsTableHead from './ShipmentsTableHead';

interface Props extends React.PropsWithChildren {
  shipments: ShipmentData[];
}
const ShipmentsTable: React.FC<Props> = ({ shipments }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - shipments.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <ShipmentsTableHead />
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? shipments.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
              )
            : shipments
          ).map((shipment) => (
            <ShipmentsRowItem key={shipment._id} shipment={shipment} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <tfoot>
          <TableRow>
            <TablePagination
              style={{ width: '100%' }}
              rowsPerPageOptions={[5, 10, 20]}
              colSpan={6}
              labelRowsPerPage="Рядов на странице"
              count={shipments.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'Показать',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </tfoot>
      </Table>
    </TableContainer>
  );
};

export default ShipmentsTable;
