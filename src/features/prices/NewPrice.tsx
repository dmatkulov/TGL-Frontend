import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PriceMutation } from '../../types/types.Price';
import { createPrice } from './pricesThunks';
import PriceForm from './components/PriceForm';
import { selectPriceCreateLoading } from './pricesSlice';

const NewPrice: React.FC = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPriceCreateLoading);

  const onFormSubmit = async (priceMutation: PriceMutation) => {
    try {
      await dispatch(createPrice(priceMutation)).unwrap();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <PriceForm onSubmit={onFormSubmit} loading={isCreating} />
    </>
  );
};

export default NewPrice;
