import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useCallback, useEffect } from 'react';
import { fetchPrice, updatePrice } from './pricesThunks';
import {
  selectPrice,
  selectPriceEditLoading,
  selectPriceLoading,
} from './pricesSlice';
import { CircularProgress } from '@mui/material';
import PriceForm from './components/PriceForm';
import { PriceMutation } from '../../types/types.Price';

interface Props {
  onClose: () => void;
}

const EditPrice: React.FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const price = useAppSelector(selectPrice);
  const isFetching = useAppSelector(selectPriceLoading);
  const isEditing = useAppSelector(selectPriceEditLoading);

  const doFetchOne = useCallback(async () => {
    try {
      await dispatch(fetchPrice()).unwrap();
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);

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
