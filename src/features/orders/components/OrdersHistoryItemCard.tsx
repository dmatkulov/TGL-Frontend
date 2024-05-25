import {Card, CardContent, Typography} from '@mui/material';
import {ShipmentThatDone} from '../../../types/types.Shipments';
import {FC} from 'react';

const OrdersHistoryItemCard: FC<ShipmentThatDone> = ({
  pupId,
  price,
  trackerNumber,
}) => {
  return (
    <>
      <Card sx={{ mt: 2, mb: 2 }}>
        <CardContent>
          <Typography
            sx={{
              mt: 1,
              mb: 1,
              '--Grid-borderWidth': '2px',
              borderBottom: 'var(--Grid-borderWidth) solid',
              borderColor: 'divider',
            }}
            gutterBottom
          >
            Трекинговый номер: { trackerNumber }
          </Typography>
          <Typography>
            Адрес ПВЗ: {pupId ? (
            pupId.address
          ) : (
            <span style={{ color: 'red', fontWeight: 700 }}>Нет ПВЗ</span>
          )}
          </Typography>
          <Typography>
            Цена: { price.usd } USD
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default OrdersHistoryItemCard;