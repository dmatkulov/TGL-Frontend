import {
  Box,
  Button,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import TablePaginationActions from './TablePaginationActions';
import {
  ShipmentData,
  ShipmentStatusData,
} from '../../../types/types.Shipments';
import ShipmentsRowItem from './ShipmentsRowItem';
import ShipmentsTableHead from './ShipmentsTableHead';
import { Statuses } from '../../../utils/constants';
import { changeShipmentsStatus } from '../shipmentsThunk';
import { useAppDispatch } from '../../../app/hooks';

interface Props {
  onDataSend: () => void;
  state: ShipmentData[];
  searchResult?: ShipmentData | null;
}

const ShipmentsTable: FC<Props> = ({ onDataSend, state, searchResult }) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [statusState, setStatusState] = useState<ShipmentStatusData[]>([]);
  const [multipleStatus, setMultipleStatus] = useState<string>('');
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>('');
  const [isMultipleSelected, setIsMultipleSelected] = useState<boolean>(false);
  const statuses = Statuses;

  const isInitial = statusState.length === 0;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - state.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    event?.preventDefault();
    setPage(newPage);
  };

  useEffect(() => {
    if (isMultipleSelected) {
      setStatusState((prevState) =>
        prevState.map((item) => ({
          ...item,
          status: multipleStatus,
        })),
      );
    }
  }, [isMultipleSelected, multipleStatus]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sendData = async () => {
    setIsMultipleSelected(false);
    await dispatch(changeShipmentsStatus(statusState));
    onDataSend();
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

  const multipleStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMultipleStatus(e.target.value);
    setIsMultipleSelected(true);
  };

  const setIsPaidToFalse = () => {
    setStatusState((prevState) =>
      prevState.map((item) => ({
        ...item,
        isPaid: false,
      })),
    );
    setIsToggled(true);
    setCurrentStatus('Не оплачено');
  };
  const setIsPaidToTrue = () => {
    setStatusState((prevState) =>
      prevState.map((item) => ({
        ...item,
        isPaid: true,
      })),
    );
    setIsToggled(true);
    setCurrentStatus('Оплачено');
  };

  const renderMultiple = (
    rowsPerPage > 0
      ? state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : state
  ).map((shipment) => (
    <ShipmentsRowItem
      shipment={shipment}
      key={shipment._id}
      createItem={createItem}
      removeItem={removeItem}
      changeHandler={changeHandler}
    />
  ));

  let renderSingle;

  if (searchResult) {
    renderSingle = (
      <ShipmentsRowItem
        shipment={searchResult}
        key={searchResult._id}
        createItem={createItem}
        removeItem={removeItem}
        changeHandler={changeHandler}
      />
    );
  } else if (searchResult === null) {
    renderSingle = (
      <TableRow>
        <TableCell>
          <Typography>Заказ не найден!</Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Box display="flex" alignItems="center" flexWrap="wrap" mb={2}>
        <Box
          flexGrow={1}
          flexBasis="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <TextField
            select
            variant="standard"
            required
            name="statusAll"
            id="statusAll"
            InputProps={{
              disableUnderline: true,
            }}
            value={multipleStatus}
            onChange={multipleStatusHandler}
            sx={{ marginRight: '8px', flexBasis: '25%' }}
          >
            {statuses.map((status) => (
              <MenuItem
                key={status}
                value={status}
                style={{ fontSize: '14px' }}
              >
                {status}
              </MenuItem>
            ))}
          </TextField>
          <Button
            onClick={setIsPaidToTrue}
            disabled={isInitial}
            variant="contained"
            sx={{ marginRight: '8px' }}
          >
            Оплачено
          </Button>
          <Button
            onClick={setIsPaidToFalse}
            disabled={isInitial}
            variant="contained"
          >
            Не оплачено
          </Button>
          <Button
            onClick={sendData}
            disabled={isInitial}
            variant="contained"
            sx={{ marginLeft: 'auto' }}
          >
            Подтвердить
          </Button>
        </Box>
        <Typography>
          {isToggled ? `Текущий статус: ${currentStatus}` : 'Статус не задан'}
        </Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <ShipmentsTableHead />
          </TableHead>
          <TableBody>
            {searchResult !== undefined ? renderSingle : renderMultiple}
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
    </>
  );
};

export default ShipmentsTable;
