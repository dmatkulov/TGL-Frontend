import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectOrderModal,
  selectOrdersDeliveryLoading,
  toggleModal,
} from '../ordersSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ShipmentAddress, ShipmentMutation } from '../../../types/typeOrder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  backgroundColor: 'background.paper',
  borderRadius: 3,
  p: 4,
};

const initialState: ShipmentAddress = {
  address: '',
  date: dayjs(new Date()),
};
const OrderModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOrderModal);
  const setDelivery = useAppSelector(selectOrdersDeliveryLoading);

  const [state, setState] = useState<ShipmentAddress>(initialState);
  const [isFilled, setIsFilled] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleResult = () => {
    if (state.address.length > 0) {
      setIsFilled(!isFilled);
    }
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setState((prevState) => ({
      ...prevState,
      date: newValue,
    }));
  };

  const handleClose = () => {
    dispatch(toggleModal(false));
    setState(initialState);
    setIsFilled(false);
  };

  const dateFormatted = state.date
    ? state.date.locale('ru').format('D MMMM YYYY')
    : dayjs(new Date()).locale('ru').format('D MMMM YYYY');

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const stateMutation: ShipmentMutation = {
      address: state.address,
      date: dateFormatted,
    };

    console.log(stateMutation);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={onFormSubmit}>
          {!isFilled && (
            <>
              <Typography gutterBottom variant="h5" component="h2" mb={3}>
                Укажите адрес и время доставки
              </Typography>

              <Grid container mb={5}>
                <Grid item xs={12} mb={2} flexGrow={1}>
                  <TextField
                    fullWidth
                    required
                    variant="standard"
                    name="address"
                    label="Адрес"
                    type="text"
                    value={state.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} mb={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Дата доставки"
                      name="date"
                      value={state.date}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    color="success"
                    onClick={toggleResult}
                  >
                    Подтвердить
                  </Button>
                </Grid>
              </Grid>
            </>
          )}

          {isFilled && (
            <>
              <Grid item xs={12} mb={3}>
                <Typography gutterBottom variant="h5" component="h2" mb={3}>
                  Пожалуйста, проверьте введенные данные перед отправкой:
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Адрес:</strong> {state.address}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Дата доставки:</strong> {dateFormatted}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" gap={2}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={setDelivery}
                >
                  Оформить доставку
                </Button>
                <Button variant="text" onClick={toggleResult}>
                  Редактировать
                </Button>
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default OrderModal;
