import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  FormHelperText,
  Button,
  TextField,
} from '@mui/material';
import { ShipmentData } from '../../../types/types.Shipments';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Statuses } from '../../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addShipmentGetLoad } from '../shipmentsSlice';
import { fetchShipments, updateShipmentStatus } from '../shipmentsThunk';

interface Props {
  shipment: ShipmentData;
}

const ShipmentsCard: React.FC<Props> = ({ shipment }) => {
  const [state, setState] = useState(shipment);
  const dispatch = useAppDispatch();
  const loading = useAppSelector(addShipmentGetLoad);
  const statuses = Statuses;

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
    <Card variant="outlined" sx={{ minWidth: 275, mb: '20px', p: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Посылка №: {shipment.trackerNumber}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Создал:</Typography>
            <Typography variant="body2" color="text.secondary">
              {shipment.userId.firstName} {shipment.userId.lastName}
            </Typography>
            <Typography variant="body1">Идентификатор заказчика:</Typography>
            <Typography variant="body2" color="text.secondary">
              {shipment.userMarketId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Статус: {shipment.status}</Typography>
            <Typography variant="body1">
              Номер трэка: {shipment.trackerNumber}
            </Typography>
            <Typography variant="body1">
              Оплачено: {shipment.isPaid ? 'Да' : 'Нет'}
            </Typography>
            <Typography variant="body1">
              Время: {dayjs(shipment.datetime).format('DD.MM.YYYY HH:mm')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Размеры посылки:</Typography>
            <Typography variant="body2" color="text.secondary">
              Высота: {shipment.dimensions.height} см
              <br />
              Ширина: {shipment.dimensions.width} см
              <br />
              Длина: {shipment.dimensions.length} см
              <br />
              Вес: {shipment.weight} кг
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body1">Цена:</Typography>
              <Typography variant="body2" color="text.secondary">
                USD: {shipment.price.usd} $<br />
                SOM: {shipment.price.som} сом
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container>
                <Grid item xs={12} sm={9}>
                  <FormControl fullWidth variant="outlined">
                    <TextField
                      select
                      required
                      name="status"
                      id="status"
                      value={state.status}
                      label="Статус"
                      onChange={inputChangeHandler}
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                    <FormHelperText>Редактировать статус:</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ ml: 2 }}
                    disabled={loading}
                    onClick={onSubmit}
                  >
                    Редактировать
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ShipmentsCard;
