import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React from 'react';
import { updatePrice } from './pricesThunks';
import { selectPriceEditLoading, selectPriceLoading } from './pricesSlice';
import { CircularProgress } from '@mui/material';
import PriceForm from './components/PriceForm';
import { Price, PriceMutation } from '../../types/types.Price';

interface Props {
  onClose: () => void;
  price: Price | null;
}

const EditPrice: React.FC<Props> = ({ onClose, price }) => {
  const dispatch = useAppDispatch();
  const isFetching = useAppSelector(selectPriceLoading);
  const isEditing = useAppSelector(selectPriceEditLoading);

  const onFormSubmit = async (priceMutation: PriceMutation) => {
    if (price) {
      await dispatch(updatePrice({ id: price._id, priceMutation })).unwrap();
    }
    onClose();
  };

  let form = <CircularProgress />;

  if (!isFetching && price) {
    form = (
      <PriceForm
        initialPrice={price}
        isEdit
        onSubmit={onFormSubmit}
        loading={isEditing}
      />
    );
  }

  return <>{form}</>;
};

export default EditPrice;
