import { Box, Button, Grid, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { LoadingButton } from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectOrdersCancelLoading, toggleModal } from '../ordersSlice';

const OrdersItem = () => {
  const dispatch = useAppDispatch();
  const cancelLoading = useAppSelector(selectOrdersCancelLoading);

  const showModal = () => {
    dispatch(toggleModal(true));
  };

  return (
    <>
      <Box
        component="div"
        sx={{ border: '2px solid #000', borderRadius: '10px', p: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ mt: 1 }}>
              <strong>Трекинговый номер:</strong> 0101 0000 0000
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1, borderTop: '1px solid #000' }}>
            <Typography>
              <strong>Адрес:</strong> Адрес пункта выдачи заказа
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <strong>Стоимость:</strong> 990 сом
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1, borderTop: '1px solid #000' }}>
            <Button
              variant="contained"
              startIcon={<LocalShippingIcon />}
              onClick={showModal}
              sx={{ mr: 3, mb: 1 }}
            >
              Доставка
            </Button>
            <LoadingButton
              startIcon={<CancelIcon />}
              loading={cancelLoading}
              disabled={cancelLoading}
              color="error"
            >
              Отменить заказ
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrdersItem;
