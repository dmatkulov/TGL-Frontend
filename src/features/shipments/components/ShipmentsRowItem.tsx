import React, { useEffect, useState } from 'react';
import { ShipmentData } from '../../../types/types.Shipments';
import { Statuses } from '../../../utils/constants';
import {
  Button,
  Checkbox,
  Collapse,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { addShipmentGetLoad, changePaidStatus } from '../shipmentsSlice';

interface Props {
  shipment: ShipmentData;
  onSubmit: () => void;
  createItem: (_id: string, status: string, isPaid: boolean) => void;
  removeItem: (_id: string) => void;
  changeHandler: (_id: string, status: string, isPaid: boolean) => void;
  multiplePaidToggle: () => void;
}
const ShipmentsRowItem: React.FC<Props> = ({
  shipment,
  onSubmit,
  createItem,
  removeItem,
  changeHandler,
  multiplePaidToggle,
}) => {
  const [state, setState] = useState(shipment);
  const [checked, setChecked] = useState(false);
  const [paidToggle, setPaidToggle] = useState(false);
  const [statusToggle, setStatusToggle] = useState(false);
  const loading = useAppSelector(addShipmentGetLoad);
  const statuses = Statuses;

  const [open, setOpen] = React.useState(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
    changeHandler(state._id, state.status, state.isPaid);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit();
    setChecked(false);
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      removeItem(state._id);
      return;
    }
    createItem(state._id, state.status, state.isPaid);
  };

  const multipleChangeHandler = () => {
    setState((prevState) => {
      return { ...prevState, isPaid: !prevState.isPaid };
    });
    setPaidToggle(true);
  };

  const directStatusChange = () => {
    setState((prevState) => {
      return { ...prevState, isPaid: !prevState.isPaid };
    });
    console.log('direct status cahnge');
  };

  useEffect(() => {
    if (checked && paidToggle) {
      multiplePaidToggle();
      changePaidStatus(state._id);
    }
  }, [checked, multiplePaidToggle, paidToggle, state._id]);

  useEffect(() => {
    if (paidToggle) {
      changeHandler(state._id, state.status, state.isPaid);
      setPaidToggle(false);
    }
  }, [changeHandler, state._id, state.isPaid, state.status, paidToggle]);

  useEffect(() => {
    if (statusToggle) {
      changeHandler(state._id, state.status, state.isPaid);
      setStatusToggle(false);
    }
  }, [changeHandler, state._id, state.isPaid, state.status, statusToggle]);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {shipment.trackerNumber}
        </TableCell>
        <TableCell>{shipment.userMarketId}</TableCell>
        <TableCell>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            justifyContent="space-between"
          >
            <Checkbox checked={checked} onChange={onCheck} />
            <TextField
              select
              disabled={loading}
              size="small"
              variant="standard"
              required
              name="status"
              id="status"
              InputProps={{
                disableUnderline: true,
              }}
              style={{ flexGrow: 1, marginRight: 2 }}
              value={state.status}
              onChange={inputChangeHandler}
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
            <Tooltip title="Изменить статус">
              <span>
                <IconButton
                  type="submit"
                  disabled={loading || !checked}
                  onClick={onFormSubmit}
                  color="primary"
                >
                  <AutorenewIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </TableCell>
        <TableCell>
          <Button
            onClick={checked ? multipleChangeHandler : directStatusChange}
            variant="contained"
            color={state.isPaid ? 'success' : 'error'}
          >
            {state.isPaid ? 'Оплачено' : 'Не оплачено'}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid sx={{ margin: 1 }}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Информация
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Время
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Габариты
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Цена (сом)
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bolder', color: 'gray' }}>
                      Создал
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{ verticalAlign: 'top' }}
                    >
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        {dayjs(shipment.datetime).format('DD.MM.YYYY HH:mm')}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'top' }}>
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        Высота: {shipment.dimensions.height} см
                        <br />
                        Ширина: {shipment.dimensions.width} см
                        <br />
                        Длина: {shipment.dimensions.length} см
                        <br />
                        Вес: {shipment.weight} кг
                      </Typography>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'top' }}>
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        USD: {shipment.price.usd} $<br />
                        SOM: {shipment.price.som} сом
                      </Typography>
                    </TableCell>
                    <TableCell style={{ verticalAlign: 'top' }}>
                      <Typography
                        variant="body2"
                        fontSize="smaller"
                        color="gray"
                      >
                        {shipment.userId.firstName} {shipment.userId.lastName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ShipmentsRowItem;
