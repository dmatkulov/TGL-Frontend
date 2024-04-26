import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, { useCallback, useEffect } from 'react';
import { fetchPrice, updatePrice } from './pricesThunks';
import {
  selectPrice,
  selectPriceEditLoading,
  selectPriceLoading,
  selectPriceResponse,
} from './pricesSlice';
import { CircularProgress } from '@mui/material';
import PriceForm from './components/PriceForm';
import { PriceMutation } from '../../types/types.Price';
import ToastMessage from '../../components/UI/ToastContainer/ToastMessage';

const EditPrice: React.FC = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector(selectPrice);
  const isFetching = useAppSelector(selectPriceLoading);
  const isEditing = useAppSelector(selectPriceEditLoading);
  const priceResponse = useAppSelector(selectPriceResponse);

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
    try {
      if (price) {
        await dispatch(updatePrice({ id: price._id, priceMutation })).unwrap();
        await dispatch(fetchPrice());
      }
    } catch (e) {
      console.log(e);
    }
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

  return (
    <>
      {priceResponse && <ToastMessage success message={priceResponse} />}
      {form}
    </>
  );
};

export default EditPrice;
