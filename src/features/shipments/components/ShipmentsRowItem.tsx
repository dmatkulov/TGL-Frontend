import React, { useState } from 'react';
import { ShipmentData } from '../../../types/types.Shipments';
import { Statuses } from '../../../utils/constants';
import {
  Checkbox,
  Chip,
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
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addShipmentGetLoad } from '../shipmentsSlice';
import { fetchShipments, updateShipmentStatus } from '../shipmentsThunk';

interface Props {
  shipment: ShipmentData;
}
const ShipmentsRowItem: React.FC<Props> = ({ shipment }) => {
  const [state, setState] = useState(shipment);
  const [checked, setChecked] = useState(false);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(addShipmentGetLoad);
  const statuses = Statuses;

  const [open, setOpen] = React.useState(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmit = async () => {
    await dispatch(updateShipmentStatus(state));
    await dispatch(fetchShipments());
  };

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
            <Checkbox
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setChecked(event.target.checked);
              }}
            />
            <TextField
              select
              disabled={!checked || loading}
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
                  onClick={onSubmit}
                  color="primary"
                >
                  <AutorenewIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        </TableCell>
        <TableCell>
          {shipment.isPaid ? (
            <Chip size="small" label="Оплачено" color="success" />
          ) : (
            <Chip size="small" label="Не оплачено" color="error" />
          )}
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
