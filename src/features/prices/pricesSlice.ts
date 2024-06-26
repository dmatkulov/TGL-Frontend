import { Price } from '../../types/types.Price';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createPrice, fetchPrice, updatePrice } from './pricesThunks';
import { toast } from 'react-toastify';

interface PriceState {
  item: Price | null;
  fetchLoading: boolean;
  createLoading: boolean;
  editLoading: boolean;
}

const initialState: PriceState = {
  item: null,
  fetchLoading: false,
  createLoading: false,
  editLoading: false,
};

export const pricesSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPrice.fulfilled, (state, { payload: priceResponse }) => {
        state.fetchLoading = false;
        state.item = priceResponse.price;
      })
      .addCase(fetchPrice.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(createPrice.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createPrice.fulfilled, (state, { payload: priceResponse }) => {
        state.createLoading = false;
        toast.success(priceResponse?.message);
      })
      .addCase(createPrice.rejected, (state, { payload: errorResponse }) => {
        state.createLoading = false;
        toast.error(errorResponse?.message);
      });

    builder
      .addCase(updatePrice.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(updatePrice.fulfilled, (state, { payload: priceResponse }) => {
        state.editLoading = false;
        toast.success(priceResponse?.message);
      })
      .addCase(updatePrice.rejected, (state, { payload: errorResponse }) => {
        state.editLoading = false;
        toast.error(errorResponse?.message);
      });
  },
});

export const pricesReducer = pricesSlice.reducer;
export const selectPrice = (state: RootState) => state.prices.item;
export const selectPriceLoading = (state: RootState) =>
  state.prices.fetchLoading;
export const selectPriceCreateLoading = (state: RootState) =>
  state.prices.createLoading;
export const selectPriceEditLoading = (state: RootState) =>
  state.prices.editLoading;
