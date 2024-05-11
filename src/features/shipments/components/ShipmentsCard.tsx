import { Card, CardContent, Typography, Grid } from '@mui/material';
import { ShipmentData } from '../../../types/types.Shipments';
import dayjs from 'dayjs';

interface Props {
  shipment: ShipmentData;
}

const ShipmentsCard: React.FC<Props> = ({ shipment }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275, mb: '20px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Посылка №: {shipment._id}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Цена:</Typography>
            <Typography variant="body2" color="text.secondary">
              USD: {shipment.price.usd} $<br />
              SOM: {shipment.price.som} сом
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">Пользователь:</Typography>
        <Typography variant="body2" color="text.secondary">
          {shipment.userId.firstName} {shipment.userId.lastName}
        </Typography>
        <Typography variant="body1">
          Идентификатор пользователя: {shipment.userMarketId}
        </Typography>
        <Typography variant="body1">Статус: {shipment.status}</Typography>
        <Typography variant="body1"></Typography>
        <Typography variant="body1">
          Номер трэка: {shipment.trackerNumber}
        </Typography>
        <Typography variant="body1">
          Оплачено: {shipment.isPaid ? 'Да' : 'Нет'}
        </Typography>
        <Typography variant="body1">
          Время: {dayjs(shipment.datetime).format('DD.MM.YYYY HH:mm')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ShipmentsCard;
