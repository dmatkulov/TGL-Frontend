import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import {
  PriceListName,
  PriceListRangesInputData,
  Range,
} from '../../../types/types.PriceLists';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../app/hooks';
import { isPriceListsUploading } from '../priceListsSlice';

const PriceListsForm = () => {
  const [state, setState] = useState<PriceListName>({
    name: '',
  });

  const [range, setRange] = useState<PriceListRangesInputData[]>([
    {
      rangeId: 10,
      rangeName: 'range',
      rangeValue: 0,
      valueId: 100,
      valueValue: 0,
      valueName: 'value',
    },
  ]);

  // const [range, setRange] = useState<Range[]>([
  //   {
  //     range: '',
  //     value: 0,
  //   },
  // ]);

  const isUploading = useAppSelector(isPriceListsUploading);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      onSubmit={submitHandler}
    >
      <TextField
        type="text"
        id="name"
        label="Название"
        value={state.name}
        onChange={inputChangeHandler}
        name="name"
        required
        sx={{ marginBottom: '16px' }}
      />
      <Box>
        <TextField
          type="text"
          id="range"
          label="Плотность"
          value={state.name}
          onChange={inputChangeHandler}
          name="range"
          required
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          type="text"
          id="value"
          label="Стоимость"
          value={state.name}
          onChange={inputChangeHandler}
          name="value"
          required
          sx={{ marginBottom: '16px' }}
        />
      </Box>
      <LoadingButton
        variant="contained"
        loading={isUploading}
        sx={{ alignSelf: 'center' }}
      >
        Подтвердить
      </LoadingButton>
    </Box>
  );
};

export default PriceListsForm;
