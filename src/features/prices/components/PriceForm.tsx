import React, { useEffect, useState } from 'react';
import { PriceMutation } from '../../../types/types.Price';
import { Box, Button, Grid, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import PageTitle from '../../users/components/PageTitle';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectPriceError,
  setPriceFieldError,
  unsetPriceMessage,
} from '../pricesSlice';
import ToastMessage from '../../../components/UI/ToastContainer/ToastMessage';

interface Props {
  onSubmit: (mutation: PriceMutation) => void;
  isEdit?: boolean;
  initialPrice?: PriceMutation;
  loading: boolean;
}

const initialState: PriceMutation = {
  exchangeRate: '',
  deliveryPrice: '',
};

const PriceForm: React.FC<Props> = ({
  onSubmit,
  isEdit = false,
  initialPrice = initialState,
  loading,
}) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<PriceMutation>(initialPrice);
  const error = useAppSelector(selectPriceError);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    dispatch(unsetPriceMessage());
  }, [dispatch]);

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !isNaN(Number(state.exchangeRate)) &&
      !isNaN(Number(state.deliveryPrice))
    ) {
      onSubmit(state);
      if (!isEdit) {
        setState(initialState);
      }
    } else {
      dispatch(
        setPriceFieldError({
          message: 'Введите корректные числовые значения!',
        }),
      );
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitFormHandler}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <PageTitle title={isEdit ? 'Обновить' : 'Создать'} />

      {error && <ToastMessage message={error} error />}

      <Grid container direction="column" spacing={2} mt={4} alignItems="center">
        <Grid item xs={8}>
          <TextField
            id="title"
            label="Курс"
            value={state.exchangeRate}
            onChange={inputChangeHandler}
            name="exchangeRate"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">USD</InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item xs>
          <TextField
            id="title"
            label="Цена за доставку"
            value={state.deliveryPrice}
            onChange={inputChangeHandler}
            name="deliveryPrice"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Сом</InputAdornment>
              ),
            }}
            required
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {isEdit ? 'Обновить' : 'Создать'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PriceForm;
