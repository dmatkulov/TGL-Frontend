import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PriceMutation } from '../../types/types.Price';
import { createPrice } from './pricesThunks';
import PriceForm from './components/PriceForm';
import { selectPriceCreateLoading, selectPriceResponse } from './pricesSlice';
import { Alert } from '@mui/material';

const NewPrice: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPriceCreateLoading);
  const response = useAppSelector(selectPriceResponse);

  const onFormSubmit = async (priceMutation: PriceMutation) => {
    try {
      await dispatch(createPrice(priceMutation)).unwrap();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {response && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {response}
        </Alert>
      )}
      <PriceForm onSubmit={onFormSubmit} loading={isCreating} />
    </>
  );
};

export default NewPrice;
