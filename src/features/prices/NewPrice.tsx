import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PriceMutation } from '../../types/types.Price';
import { createPrice } from './pricesThunks';
import PriceForm from './components/PriceForm';
import { selectPriceCreateLoading } from './pricesSlice';

interface Props {
  onClose: () => void;
}

const NewPrice: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectPriceCreateLoading);

  const onFormSubmit = async (priceMutation: PriceMutation) => {
    await dispatch(createPrice(priceMutation)).unwrap();
    onClose();
  };
  return (
    <>
      <PriceForm onSubmit={onFormSubmit} loading={isCreating} />
    </>
  );
};

export default NewPrice;
