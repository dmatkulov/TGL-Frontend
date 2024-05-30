import React, { useEffect, useState } from 'react';
import {
  ShipmentData,
  ShipmentStatusData,
} from '../../../types/types.Shipments';
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
  Typography,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../app/hooks';
import { addShipmentGetLoad } from '../shipmentsSlice';

interface Props {
  shipment: ShipmentData;
  createItem: (_id: string, status: string, isPaid: boolean) => void;
  removeItem: (_id: string) => void;
  changeHandler: (_id: string, status: string, isPaid: boolean) => void;
}

const initialState: ShipmentStatusData = {
  _id: '',
  status: '',
  isPaid: false,
};

const ShipmentsRowItem: React.FC<Props> = ({
  shipment,
  createItem,
  removeItem,
  changeHandler,
}) => {
  const [localState, setLocalState] =
    useState<ShipmentStatusData>(initialState);
  const [checked, setChecked] = useState(false);
  const [paidToggle, setPaidToggle] = useState(false);
  const [statusToggle, setStatusToggle] = useState(false);
  const loading = useAppSelector(addShipmentGetLoad);
  const statuses = Statuses;

  const [open, setOpen] = React.useState(false);

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalState((prevState) => {
      return { ...prevState, [name]: value };
    });
    setStatusToggle(true);
  };

  const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (checked) {
      removeItem(shipment._id);
      return;
    }
    createItem(shipment._id, shipment.status, shipment.isPaid);
  };

  const paidStatusChangeHandler = () => {
    if (checked) {
      setLocalState((prevState) => {
        return { ...prevState, isPaid: !prevState.isPaid };
      });
      setPaidToggle(true);
    }
  };

  useEffect(() => {
    setLocalState((prevState) => ({
      ...prevState,
      _id: shipment._id,
      status: shipment.status,
      isPaid: shipment.isPaid,
    }));
  }, [shipment._id, shipment.isPaid, shipment.status]);

  useEffect(() => {
    if (checked && paidToggle) {
      changeHandler(localState._id, localState.status, localState.isPaid);
      setPaidToggle(false);
    }
  }, [
    changeHandler,
    checked,
    localState._id,
    localState.isPaid,
    localState.status,
    paidToggle,
  ]);

  useEffect(() => {
    if (statusToggle && checked) {
      changeHandler(localState._id, localState.status, localState.isPaid);
      setStatusToggle(false);
    }
  }, [
    changeHandler,
    checked,
    localState._id,
    localState.isPaid,
    localState.status,
    statusToggle,
  ]);

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
              disabled={loading || !checked}
              size="small"
              variant="standard"
              required
              name="status"
              id="status"
              InputProps={{
                disableUnderline: true,
              }}
              style={{ flexGrow: 1, marginRight: 2 }}
              value={localState.status}
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
          </Stack>
        </TableCell>
        <TableCell>
          <Button
            onClick={paidStatusChangeHandler}
            variant="contained"
            color={localState.isPaid ? 'success' : 'error'}
          >
            {localState.isPaid ? 'Оплачено' : 'Не оплачено'}
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
