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
import React, { useEffect, useState } from 'react';
import TablePaginationActions from './TablePaginationActions';
import { ShipmentStatusData } from '../../../types/types.Shipments';
import ShipmentsRowItem from './ShipmentsRowItem';
import ShipmentsTableHead from './ShipmentsTableHead';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { multiplePaidChange, selectShipments } from '../shipmentsSlice';

const ShipmentsTable = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectShipments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusState, setStatusState] = useState<ShipmentStatusData[]>([]);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  // useEffect(() => {
  //   dispatch(fetchShipments());
  // }, [dispatch]);
  //

  useEffect(() => {
    console.log(statusState);
  }, [statusState]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onFormSubmit = () => {
    console.log('QWE', statusState);
    // await dispatch(updateShipmentStatus(state));
    // await dispatch(fetchShipments());
  };

  const createItem = (_id: string, status: string, isPaid: boolean) => {
    const item: ShipmentStatusData = {
      _id: _id,
      status: status,
      isPaid: isPaid,
    };
    setStatusState((prevState) => [...prevState, item]);
  };

  const removeItem = (_id: string) => {
    setStatusState((prevState) => prevState.filter((item) => item._id !== _id));
  };

  const changeHandler = (_id: string, status: string, isPaid: boolean) => {
    setStatusState((prevState) =>
      prevState.map((item) =>
        item._id === _id
          ? {
              ...item,
              status,
              isPaid,
            }
          : item,
      ),
    );
  };

  const multiplePaidToggle = () => {
    setStatusState((prevState) =>
      prevState.map((item) => ({
        ...item,
        isPaid: !item.isPaid,
      })),
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <ShipmentsTableHead />
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : state
          ).map((shipment) => (
            <ShipmentsRowItem
              shipment={shipment}
              onSubmit={onFormSubmit}
              key={shipment._id}
              createItem={createItem}
              removeItem={removeItem}
              changeHandler={changeHandler}
              multiplePaidToggle={multiplePaidToggle}
            />
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
              count={state.length}
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
