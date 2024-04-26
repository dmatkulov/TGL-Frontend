import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PriceMutation } from '../../types/types.Price';
import { createPrice } from './pricesThunks';
import PriceForm from './components/PriceForm';
import {
  selectPriceCreateLoading,
  selectPriceError,
  selectPriceResponse,
} from './pricesSlice';
import ToastMessage from '../../components/UI/ToastContainer/ToastMessage';

const NewPrice: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPriceCreateLoading);
  const success = useAppSelector(selectPriceResponse);
  const error = useAppSelector(selectPriceError);

  const onFormSubmit = async (priceMutation: PriceMutation) => {
    await dispatch(createPrice(priceMutation)).unwrap();
  };
  return (
    <>
      {success && <ToastMessage message={success} success />}
      {error && <ToastMessage message={error} error />}
      <PriceForm onSubmit={onFormSubmit} loading={isCreating} />
    </>
  );
};

export default NewPrice;
