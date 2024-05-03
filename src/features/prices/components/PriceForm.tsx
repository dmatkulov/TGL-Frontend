import React, { useState } from 'react';
import { PriceMutation } from '../../../types/types.Price';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useAppSelector } from '../../../app/hooks';
import { selectPriceFieldError } from '../pricesSlice';

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
  const error = useAppSelector(selectPriceFieldError);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
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
        {error && (
          <Grid item>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        <Grid item xs>
          <TextField
            id="title"
            label="Курс"
            value={state.exchangeRate}
            onChange={inputChangeHandler}
            name="exchangeRate"
            type="number"
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
            type="number"
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
