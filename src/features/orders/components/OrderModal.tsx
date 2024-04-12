import React, { useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectOrderModal,
  selectOrdersDeliveryLoading,
  toggleModal,
} from '../ordersSlice';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { OrderAddress } from '../../../types/typeOrder';
import dayjs from 'dayjs';

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
const OrderModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOrderModal);
  const setDelivery = useAppSelector(selectOrdersDeliveryLoading);

  const [state, setState] = useState<OrderAddress>({
    address: '',
    date: dayjs(new Date()),
  });

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const stateMutation = {
      state: state.address,
      date: state.date?.format('DD-MM-YYYY'),
    };

    console.log(stateMutation);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setState((prevState) => ({
      ...prevState,
      date: newValue,
    }));
  };

  const handleClose = () => {
    dispatch(toggleModal(false));
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
          <Typography gutterBottom variant="h5" component="h2" mb={3}>
            Укажите адрес и время доставки
          </Typography>

          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={7} mb={2} mr={2} flexGrow={1}>
              <TextField
                fullWidth
                required
                name="address"
                label="Адрес"
                type="text"
                value={state.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4} mb={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    label="Дата доставки"
                    name="date"
                    defaultValue={dayjs(new Date())}
                    value={state.date}
                    format="DD-MM-YYYY"
                    onChange={handleDateChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" disabled={setDelivery}>
              Оформить доставку
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default OrderModal;
