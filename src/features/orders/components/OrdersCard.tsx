import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FC, useState } from 'react';
import { Shipment } from '../../../types/types.Shipments';
import { useAppDispatch } from '../../../app/hooks';
import { toggleModal } from '../ordersSlice';
import { LoadingButton } from '@mui/lab';
import WarningModal from './WarningModal';

const OrdersCard: FC<Shipment> = ({
  _id,
  pupId,
  price,
  trackerNumber,
  status,
  delivery,
}) => {
  const smallScreen = useMediaQuery('(max-width:860px)');
  const extraSmallScreen = useMediaQuery('(max-width:400px)');

  const dispatch = useAppDispatch();
  const [state, setState] = useState(false);
  const [color, setColor] = useState(false);

  const openWarningModalWindow = () => {
    setState(true);
  };

  const closeWarningModalWindow = () => {
    setState(false);
  };

  const changeColorField = () => {
    setColor(true);
    setState(false);
  };

  const showModal = () => {
    dispatch(toggleModal({ toggle: true, id: { _id } }));
  };

  const handleDeliveryButtonClick = () => {
    if (delivery.status) {
      const confirmed = window.confirm('Вы правда хотите отменити доставку');
      if (confirmed) {
        showModal();
      }
    } else {
      showModal();
    }
  };

  return (
    <>
      <WarningModal
        changeColor={changeColorField}
        closeModal={closeWarningModalWindow}
        stateModal={state}
      />
      <Grid item key={_id} xs={smallScreen ? 12 : 6}>
        <Card sx={{ minWidth: extraSmallScreen ? 200 : 275 }}>
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
              Трекинговый номер: {trackerNumber}
            </Typography>
            <Typography>
              Адресс ПВЗ:{' '}
              {pupId ? (
                pupId.address
              ) : (
                <span style={{ color: 'red', fontWeight: 700 }}>Нет ПВЗ</span>
              )}
            </Typography>
            <Typography>Статус: {status}</Typography>
            <Typography
              sx={{
                mt: 1,
                '--Grid-borderWidth': '2px',
                borderBottom: 'var(--Grid-borderWidth) solid',
                borderColor: 'divider',
              }}
              gutterBottom
            >
              Цена: {price.usd} USD
            </Typography>
            <Typography sx={{ mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleDeliveryButtonClick}
                disabled={color}
                sx={{ mr: 3 }}
              >
                {delivery.status
                  ? 'Отменить доставку'
                  : color
                    ? 'Отмена'
                    : 'Доставка'}
              </Button>
              <LoadingButton
                sx={{ minWidth: '29px', padding: '3px', borderRadius: '50%' }}
                onClick={openWarningModalWindow}
                color="error"
              >
                Отменить
              </LoadingButton>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default OrdersCard;
