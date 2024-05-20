import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { idToModalState, selectOrderModal, toggleModal } from '../ordersSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DeliveryData, ShipmentAddress } from '../../../types/types.Order';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { selectUser } from '../../users/usersSlice';
import PhoneInput from 'react-phone-input-2';
import {
  fetchShipmentsByUser,
  orderDelivery,
} from '../../shipments/shipmentsThunk';

const style = {
  position: 'absolute',
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
  phoneNumber: '',
  date: dayjs(new Date()),
};
const OrderModal = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const open = useAppSelector(selectOrderModal);
  const selectedShipmentId = useAppSelector(idToModalState);
  const [state, setState] = useState<ShipmentAddress>(initialState);

  useEffect(() => {
    if (user?.address !== '') {
      setState((prevState) => ({
        ...prevState,
        address: user?.address as string,
      }));
    }
    if (user?.phoneNumber !== '') {
      setState((prevState) => ({
        ...prevState,
        phoneNumber: user?.phoneNumber as string,
      }));
    }
  }, [user?.address, user?.phoneNumber]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePhoneChange = (value: string) => {
    setState((prevState) => ({ ...prevState, phoneNumber: value }));
  };

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    setState((prevState) => ({
      ...prevState,
      date: newValue,
    }));
  };

  const handleClose = () => {
    dispatch(toggleModal(false));
    dispatch(fetchShipmentsByUser(user?.marketId as string));
  };

  const dateFormatted = state.date
    ? state.date.locale('ru').format('D MMMM YYYY')
    : dayjs(new Date()).locale('ru').format('D MMMM YYYY');

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const deliveryData: DeliveryData = {
      _id: selectedShipmentId,
      address: state.address,
      phoneNumber: state.phoneNumber,
      date: dateFormatted,
    };

    dispatch(orderDelivery(deliveryData));
    if (user) {
      dispatch(fetchShipmentsByUser(user?.marketId));
    }
    handleClose();
  };

  return (
    <>
      <Modal
        open={open === undefined ? false : open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} onSubmit={onFormSubmit}>
          <>
            <Typography gutterBottom variant="h5" component="h2" mb={3}>
              Введите данные
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
              <Grid item xs={12} mb={2} flexGrow={1}>
                <PhoneInput
                  country="kg"
                  masks={{ kg: '(...) ..-..-..' }}
                  onlyCountries={['kg']}
                  containerStyle={{ width: '100%' }}
                  value={state.phoneNumber}
                  onChange={handlePhoneChange}
                  defaultErrorMessage={'Неправильный ввод'}
                  specialLabel="Номер телефона*"
                  disableDropdown
                  inputStyle={{ width: '100%' }}
                  inputProps={{
                    name: 'phoneNumber',
                    required: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} mb={3}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale={'ru'}
                >
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
                  type="submit"
                >
                  Подтвердить
                </Button>
              </Grid>
            </Grid>
          </>
        </Box>
      </Modal>
    </>
  );
};

export default OrderModal;
