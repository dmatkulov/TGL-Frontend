import React, { useEffect, useState } from 'react';
import { PriceMutation } from '../../../types/types.Price';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import PageTitle from '../../users/components/PageTitle';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectPriceError,
  setPriceFieldError,
  unsetPriceMessage,
} from '../pricesSlice';

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
  const priceFieldError = useAppSelector(selectPriceError);

  const [state, setState] = useState<PriceMutation>(initialPrice);
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
      setState(initialState);
    } else {
      dispatch(
        setPriceFieldError({
          message:
            'Введите корректные числовые значения для курса и цены доставки',
        }),
      );

      setTimeout(clearError, 1500);
    }
  };

  const clearError = () => {
    dispatch(setPriceFieldError(null));
    setState(initialState);
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

      {priceFieldError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {priceFieldError.message}
        </Alert>
      )}

      <Grid container direction="column" spacing={2} mt={4} alignItems="center">
        <Grid item xs={8}>
          <TextField
            id="title"
            label="Курс"
            value={state.exchangeRate}
            onChange={inputChangeHandler}
            name="exchangeRate"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">usd</InputAdornment>
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
              startAdornment: (
                <InputAdornment position="start">kgs</InputAdornment>
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
