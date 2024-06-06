import React, { useState } from 'react';
import { PriceMutation } from '../../../types/types.Price';
import { Box, Button, Grid, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

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
  const [state, setState] = useState<PriceMutation>(initialPrice);
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (parseFloat(value) <= 0) {
      return;
    }
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const isFormValid = () => {
    const { exchangeRate, deliveryPrice } = state;

    return exchangeRate && deliveryPrice;
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(state);
      if (!isEdit) {
        setState(initialState);
      }
    } catch (e) {
      console.log(e);
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
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid item xs>
          <TextField
            required
            id="title"
            label="Курс"
            value={state.exchangeRate}
            onChange={inputChangeHandler}
            name="exchangeRate"
            type="number"
            sx={{marginTop: 1}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">USD</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs>
          <TextField
            required
            id="title"
            label="Цена за доставку"
            value={state.deliveryPrice}
            onChange={inputChangeHandler}
            name="deliveryPrice"
            type="number"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">Сом</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isFormValid() || loading}
            fullWidth
          >
            {isEdit ? 'Обновить' : 'Создать'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PriceForm;
